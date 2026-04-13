import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// SECURITY: This route must only work strictly in local development!
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Access Denied. This route is disabled in production." }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    
    const groomName = formData.get("groomName")?.toString() || "";
    const brideName = formData.get("brideName")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const venueName = formData.get("venueName")?.toString() || "";
    const venueAddress = formData.get("venueAddress")?.toString() || "";
    const locationUrl = formData.get("locationUrl")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    
    // Process Images
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Helper to save a file from FormData
    const saveFile = async (field: string, defaultName: string) => {
      const file = formData.get(field) as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(publicDir, defaultName);
        fs.writeFileSync(filePath, buffer);
        console.log(`Saved file: ${defaultName}`);
      }
    };

    // Save Intro GIF and First Frame (Poster) if provided
    await saveFile("introGif", "intro.gif");
    await saveFile("introPoster", "intro_poster.png");
    await saveFile("introLastFrame", "intro_last_frame.png");
    
    // Dynamic Gallery Images Logic
    const galleryImages: string[] = [];
    
    // Save Hero image
    const heroImageFile = formData.get("heroImage") as File | null;
    if (heroImageFile && heroImageFile.size > 0) {
      await saveFile("heroImage", "wedding_hero.png");
      galleryImages.push("/wedding_hero.png");
    } else {
      // Default fallback if not uploaded
      galleryImages.push("/wedding_hero.png");
    }

    // Save up to 6 gallery images
    for (let i = 1; i <= 6; i++) {
      const imgFile = formData.get(`gallery_${i}`) as File | null;
      if (imgFile && imgFile.size > 0) {
        const ext = imgFile.name.split('.').pop() || 'png';
        const fileName = `gallery_${i}.${ext}`;
        await saveFile(`gallery_${i}`, fileName);
        galleryImages.push(`/${fileName}`);
      } else {
        // Fallback to the default name if it wasn't uploaded but keep the previous one
        galleryImages.push(`/gallery_${i}.png`);
      }
    }

    // Generate the config.ts content
    const configContent = `import { InvitationData } from "@/types/invitation";

/**
 * ============================================================================
 * 👰🤵 ملف تعديل بيانات الدعوة (تم توليده أوتوماتيكياً من لوحة التحكم)
 * ============================================================================
 */

export const INVITATION_DATA: InvitationData = {
  groomName: ${JSON.stringify(groomName)},
  brideName: ${JSON.stringify(brideName)},
  date: ${JSON.stringify(date)},
  venueName: ${JSON.stringify(venueName)},
  venueAddress: ${JSON.stringify(venueAddress)},
  locationUrl: ${JSON.stringify(locationUrl)},
  message: ${JSON.stringify(message)},
  musicUrl: "",
  galleryImages: ${JSON.stringify(galleryImages, null, 4)},
  schedule: [
    { time: "٧:٠٠ م", title: "استقبال المدعوين", description: "تشريف الضيوف الكرام ومرحبًا بكم في حفل الزفاف.", icon: "🌹" },
    { time: "٨:٠٠ م", title: "العشاء", description: "تناول العشاء على أنغام الموسيقى الشرقية الراقية.", icon: "🍽️" },
    { time: "٩:٠٠ م", title: "دخول العروسين", description: "الدخلة المميزة للعريس ${groomName} والعروسة ${brideName}.", icon: "💍" },
    { time: "٩:٣٠ م", title: "الرقصة الأولى", description: "أجمل لحظات العمر عالأغاني العربية الرومانسية.", icon: "💃" },
  ],
};
`;

    // Write to config.ts
    const configPath = path.join(process.cwd(), "src", "config.ts");
    fs.writeFileSync(configPath, configContent, "utf-8");

    return NextResponse.json({ success: true, message: "Template updated successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving config:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
