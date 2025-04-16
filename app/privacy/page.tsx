import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";

const PrivacyPage = () => {
  return (
    <ClientOnly>
      <Container>
        <div className="max-w-4xl mx-auto py-12">
          <Heading
            title="سياسة الخصوصية"
            subtitle="معلومات حول كيفية حماية خصوصيتك وبياناتك الشخصية"
          />
          
          <div className="mt-8 space-y-8 text-neutral-600">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">مقدمة</h2>
              <p>
                تحترم منصة إيواء هوم خصوصية مستخدميها وتلتزم بحماية المعلومات الشخصية التي تشاركونها معنا. توضح سياسة الخصوصية هذه كيفية جمع المعلومات واستخدامها وحمايتها عند استخدام موقعنا الإلكتروني.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">المعلومات التي نجمعها</h2>
              <p>
                قد نقوم بجمع أنواع مختلفة من المعلومات عند استخدامك للموقع، بما في ذلك:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>معلومات التسجيل (الاسم، البريد الإلكتروني، رقم الهاتف)</li>
                <li>معلومات الملف الشخصي</li>
                <li>معلومات عن العقارات التي تقوم بنشرها أو البحث عنها</li>
                <li>بيانات الاستخدام والتصفح</li>
                <li>سجلات المراسلات مع فريق الدعم</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">كيفية استخدام المعلومات</h2>
              <p>
                نستخدم المعلومات التي نجمعها للأغراض التالية:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>تقديم وإدارة وتحسين خدماتنا</li>
                <li>تسهيل عملية البحث عن العقارات والتواصل بين المستخدمين</li>
                <li>إرسال إشعارات وتحديثات متعلقة بالحساب</li>
                <li>تحسين تجربة المستخدم وتخصيصها</li>
                <li>مراقبة وتحليل استخدام واتجاهات الموقع</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">مشاركة المعلومات</h2>
              <p>
                نحن نحترم خصوصيتك ولا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أطراف ثالثة باستثناء في الحالات التالية:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>موافقتك الصريحة</li>
                <li>مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا</li>
                <li>الالتزام بالقوانين والأنظمة المعمول بها</li>
                <li>حماية حقوقنا أو ممتلكاتنا أو سلامة الآخرين</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">أمان البيانات</h2>
              <p>
                نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف. ومع ذلك، لا يمكن ضمان أمان البيانات المرسلة عبر الإنترنت بنسبة 100%، ولذلك نبذل قصارى جهدنا لحماية معلوماتك الشخصية ولكن لا يمكننا ضمان أمنها المطلق.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">حقوق الخصوصية الخاصة بك</h2>
              <p>
                تتمتع بحقوق معينة فيما يتعلق بمعلوماتك الشخصية، بما في ذلك:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 mr-4">
                <li>الوصول إلى معلوماتك الشخصية وتصحيحها</li>
                <li>حذف معلوماتك في ظروف معينة</li>
                <li>الاعتراض على معالجة معلوماتك</li>
                <li>سحب موافقتك في أي وقت</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">تغييرات على سياسة الخصوصية</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث" أدناه.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">اتصل بنا</h2>
              <p>
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا.
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

export default PrivacyPage; 