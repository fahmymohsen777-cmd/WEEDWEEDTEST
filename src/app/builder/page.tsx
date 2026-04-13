"use client";

import { useState } from "react";

export default function BuilderPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/save-config", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "حدث خطأ غير متوقع");
      }

      setSuccessMsg("🎉 تم تحديث القالب بالكامل بنجاح! يمكنك الآن رفعه للـ GitHub.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 p-6 md:p-12" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#382216] px-8 py-6 text-white text-center">
          <h1 className="text-3xl font-bold font-arabic-script mb-2">لوحة تحكم القالب السحرية ✨</h1>
          <p className="text-white/80 font-arabic text-sm">
            أدخل بيانات العميل هنا واضغط "حفظ وتوليد". النظام سيقوم بتعديل الكود واستبدال الصور تلقائياً ولن تضطر لكتابة سطر برمجي واحد!
          </p>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 m-8 mb-0 rounded text-green-700 font-arabic font-medium">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-8 mb-0 rounded text-red-700 font-arabic font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-10 font-arabic">
          
          {/* Section 1: Texts */}
          <section>
            <h2 className="text-xl font-bold text-[#382216] border-b pb-2 mb-6">1. البيانات الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">اسم العريس</label>
                <input type="text" name="groomName" required defaultValue="علي" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#382216] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">اسم العروسة</label>
                <input type="text" name="brideName" required defaultValue="شهيناز" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#382216] transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700">تاريخ ووقت الفرح</label>
                <input type="datetime-local" name="date" required defaultValue="2026-09-19T19:00" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#382216] transition-colors" />
                <p className="text-xs text-gray-400 mt-1">عشان تظبط العد التنازلي.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Venue */}
          <section>
            <h2 className="text-xl font-bold text-[#382216] border-b pb-2 mb-6">2. بيانات القاعة</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">اسم القاعة</label>
                  <input type="text" name="venueName" required defaultValue="قاعة الفردوس للأفراح" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#382216] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">العنوان بالتفصيل</label>
                  <input type="text" name="venueAddress" required defaultValue="١٥ شارع النيل، المعادي، القاهرة" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#382216] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">رابط خرائط جوجل (Embed URL)</label>
                <textarea name="locationUrl" rows={2} required defaultValue="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.2357!3d29.9792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584573d3c67f0b!2sMaadi!5e0!3m2!1sen!2seg!4v1614000000000" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#382216] transition-colors text-left" dir="ltr"></textarea>
                <p className="text-xs text-gray-400 mt-1">قم بنسخ الرابط من Google Maps Embed لتظهر الخريطة بشكل صحيح.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Message */}
          <section>
            <h2 className="text-xl font-bold text-[#382216] border-b pb-2 mb-6">3. رسالة الدعوة</h2>
            <div>
              <textarea name="message" rows={4} required defaultValue={"بسم الله الرحمن الرحيم\n\nيسعدنا ويشرّفنا أن ندعوكم لحضور حفل زفاف نجلنا الغالي\n\nونتمنى أن نرى بهجتكم معنا في هذه الليلة الجميلة"} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#382216] transition-colors"></textarea>
            </div>
          </section>

          {/* Section 4: Media Uploads */}
          <section>
            <h2 className="text-xl font-bold text-[#382216] border-b pb-2 mb-6">4. الصور والفيديو (اختياري)</h2>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6 text-sm text-yellow-800">
              <strong>ملاحظة هامة:</strong> اترك خانة الصورة فارغة إذا كنت **لا** تريد تغييرها، سيحتفظ الموقع بالصورة القديمة تلقائياً. المسموح فقط برفع صور (PNG/JPG) أو ملفات (GIF).
            </div>
            
            <div className="space-y-6">
              <div className="p-4 border border-dashed border-[#382216]/20 rounded-xl bg-gray-50">
                 <h3 className="font-bold text-gray-800 mb-4">فيديو البداية واسكرين شوت (Intro)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">الفيديو المتحرك (intro.gif)</label>
                      <input type="file" name="introGif" accept="image/gif" className="text-sm w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">آخر لقطة في الفيديو (intro_last_frame.png)</label>
                      <input type="file" name="introLastFrame" accept="image/png, image/jpeg" className="text-sm w-full" />
                    </div>
                 </div>
              </div>

              <div className="p-4 border border-dashed border-[#382216]/20 rounded-xl bg-gray-50">
                 <h3 className="font-bold text-gray-800 mb-4">صورة العرسان الأساسية (Hero)</h3>
                 <div>
                    <input type="file" name="heroImage" accept="image/png, image/jpeg" className="text-sm w-full" />
                 </div>
              </div>

              <div className="p-4 border border-dashed border-[#382216]/20 rounded-xl bg-gray-50">
                 <h3 className="font-bold text-gray-800 mb-4">معرض الصور (Gallery - 6 صور)</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[1,2,3,4,5,6].map((num) => (
                      <div key={num}>
                        <label className="block text-xs font-semibold mb-1">صورة رقم {num}</label>
                        <input type="file" name={`gallery_${num}`} accept="image/png, image/jpeg" className="text-sm w-full" />
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="pt-6 border-t mt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#382216] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#2c1a10] disabled:opacity-50 transition-all shadow-xl shadow-[#382216]/20 flex justify-center items-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جارِ تعديل القالب والصور، برجاء الانتظار...
                </>
              ) : (
                "حفظ وتوليد القالب الآن 🚀"
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">بعد ما يخلص التحميل، افتح الترمنال واعمل git push</p>
          </div>
        </form>
      </div>
    </div>
  );
}
