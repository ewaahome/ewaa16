import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";

const AboutPage = () => {
  return (
    <ClientOnly>
      <Container>
        <div className="max-w-4xl mx-auto py-12">
          <Heading
            title="عن موقع إيواء هوم"
            subtitle="تعرف على قصتنا ورؤيتنا وما نسعى لتحقيقه"
          />
          
          <div className="mt-8 space-y-6 text-neutral-600">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">رؤيتنا</h2>
              <p>
                نسعى في إيواء هوم أن نكون المنصة الأولى والأكثر موثوقية في مجال العقارات داخل المملكة العربية السعودية. نهدف إلى تسهيل عملية البحث عن العقارات المناسبة وتأجيرها بطريقة سلسة وآمنة لجميع المستخدمين.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">قصتنا</h2>
              <p>
                بدأت فكرة إيواء هوم في عام 2023 عندما لاحظنا الصعوبات التي يواجهها الأفراد في العثور على العقارات المناسبة لاحتياجاتهم. قررنا إنشاء منصة تجمع مالكي العقارات والباحثين عنها في مكان واحد، مع التركيز على تقديم تجربة مستخدم متميزة ومعلومات دقيقة حول العقارات.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">فريقنا</h2>
              <p>
                يتكون فريق إيواء هوم من مجموعة متنوعة من الخبراء في مجالات العقارات والتكنولوجيا والتسويق، الذين يعملون معًا لتقديم أفضل خدمة ممكنة لمستخدمينا. نحن نؤمن بأهمية التعاون والابتكار لتحسين منصتنا باستمرار.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-neutral-800">التزامنا</h2>
              <p>
                نلتزم في إيواء هوم بتقديم خدمة عالية الجودة تتميز بالشفافية والأمان، ونعمل باستمرار على تطوير منصتنا لتلبية احتياجات مستخدمينا المتغيرة. نحن نضمن دقة المعلومات المقدمة حول العقارات ونسعى جاهدين لتوفير تجربة سلسة للمستخدمين.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-neutral-50 p-8 rounded-lg border border-neutral-200">
            <h2 className="text-xl font-semibold mb-4 text-neutral-800 text-center">انضم إلينا اليوم</h2>
            <p className="text-center">
              نحن ندعوك للانضمام إلى مجتمع إيواء هوم واكتشاف كيف يمكننا مساعدتك في رحلتك العقارية، سواء كنت تبحث عن عقار للإيجار أو كنت مالكًا ترغب في تأجير عقارك.
            </p>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default AboutPage; 