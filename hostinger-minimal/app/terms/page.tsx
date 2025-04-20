import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";

const TermsPage = () => {
  return (
    <ClientOnly>
      <Container>
        <div className="max-w-4xl mx-auto py-12">
          <Heading
            title="الشروط والأحكام"
            subtitle="يرجى قراءة هذه الشروط بعناية قبل استخدام منصتنا"
          />
          
          <div className="mt-8 space-y-8 text-neutral-600">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">مقدمة</h2>
              <p>
                مرحباً بك في منصة إيواء هوم. تحكم هذه الشروط والأحكام استخدام موقعنا وخدماتنا. باستخدامك لمنصتنا، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام موقعنا.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">استخدام الموقع</h2>
              <p>
                يُسمح لك باستخدام موقعنا فقط للأغراض المشروعة ووفقاً لهذه الشروط. أنت توافق على عدم:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>استخدام موقعنا بطريقة تخالف أي قوانين أو لوائح محلية أو وطنية أو دولية</li>
                <li>استخدام موقعنا لأي غرض غير قانوني أو احتيالي، أو له أثر غير قانوني أو احتيالي</li>
                <li>نشر أي محتوى مسيء أو تشهيري أو إباحي أو تهديدي</li>
                <li>محاولة الوصول غير المصرح به إلى أجزاء من موقعنا</li>
                <li>نقل أي فيروسات أو برامج ضارة أخرى</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">إنشاء الحساب والتسجيل</h2>
              <p>
                عند إنشاء حساب في موقعنا، يجب عليك:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>تقديم معلومات دقيقة وكاملة وحديثة</li>
                <li>الحفاظ على سرية كلمة المرور الخاصة بك</li>
                <li>إبلاغنا فوراً بأي خرق أمني أو استخدام غير مصرح به لحسابك</li>
                <li>أن تكون مسؤولاً عن جميع الأنشطة التي تحدث تحت حسابك</li>
              </ul>
              <p className="mt-2">
                نحتفظ بالحق في تعليق أو إنهاء حسابك إذا اعتقدنا أنك انتهكت هذه الشروط.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">قوائم العقارات</h2>
              <p>
                عند نشر عقار على منصتنا، فإنك:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>تضمن أن لديك الحق في عرض العقار للبيع أو الإيجار</li>
                <li>تضمن أن جميع المعلومات المقدمة دقيقة وكاملة</li>
                <li>توافق على تحديث المعلومات إذا تغيرت حالة العقار</li>
                <li>تتحمل المسؤولية الكاملة عن محتوى القائمة والتواصل مع المشترين أو المستأجرين المحتملين</li>
              </ul>
              <p className="mt-2">
                نحتفظ بالحق في إزالة أي قائمة عقارية تنتهك هذه الشروط أو التي نعتقد أنها احتيالية.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">المدفوعات والرسوم</h2>
              <p>
                في حال تم فرض رسوم على خدماتنا:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>توافق على دفع جميع الرسوم المطبقة كما هو محدد</li>
                <li>نحتفظ بالحق في تغيير رسومنا في أي وقت مع إشعار مسبق</li>
                <li>جميع المدفوعات هي نهائية وغير قابلة للاسترداد ما لم ينص على خلاف ذلك</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">حقوق الملكية الفكرية</h2>
              <p>
                جميع المحتويات والتصاميم والشعارات والعلامات التجارية على موقعنا هي ملكية لنا أو للجهات المرخصة لنا. لا يجوز لك استخدام أو إعادة إنتاج أي من هذه المواد دون إذن صريح منا.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">إخلاء المسؤولية</h2>
              <p>
                يتم توفير موقعنا "كما هو" دون أي ضمانات. نحن:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>لا نضمن دقة أو اكتمال أو موثوقية أي محتوى على موقعنا</li>
                <li>لا نتحمل المسؤولية عن أي خسارة أو ضرر ينتج عن استخدامك لموقعنا</li>
                <li>لا نتحمل المسؤولية عن الصفقات التي تتم بين المستخدمين، حيث نعمل فقط كمنصة وسيطة</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">حل النزاعات</h2>
              <p>
                في حالة نشوء أي نزاع بين المستخدمين، نشجع على حله ودياً. نحتفظ بالحق في التدخل ولكن لا نتحمل مسؤولية ضمان حل مرضٍ.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">تعديلات على الشروط</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر الشروط المحدثة على هذه الصفحة مع تاريخ "آخر تحديث". استمرارك في استخدام موقعنا بعد نشر أي تغييرات يشكل قبولك لهذه التغييرات.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">القانون المطبق</h2>
              <p>
                تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية وتفسر وفقاً لها.
              </p>
            </div>
            
            <p className="text-sm text-neutral-500 pt-4">
              آخر تحديث: 15 يوليو 2023
            </p>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default TermsPage; 