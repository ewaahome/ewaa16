import countries from 'world-countries';

// قاموس الترجمات العربية لأسماء البلدان المشهورة
const arabicNames: { [key: string]: string } = {
  'Saudi Arabia': 'المملكة العربية السعودية',
  'United Arab Emirates': 'الإمارات العربية المتحدة',
  'Kuwait': 'الكويت',
  'Qatar': 'قطر',
  'Bahrain': 'البحرين',
  'Oman': 'عمان',
  'Egypt': 'مصر',
  'Jordan': 'الأردن',
  'Lebanon': 'لبنان',
  'Syria': 'سوريا',
  'Iraq': 'العراق',
  'Morocco': 'المغرب',
  'Tunisia': 'تونس',
  'Algeria': 'الجزائر',
  'Libya': 'ليبيا',
  'Sudan': 'السودان',
  'Yemen': 'اليمن',
  'Palestine': 'فلسطين',
  'United States': 'الولايات المتحدة الأمريكية',
  'United Kingdom': 'المملكة المتحدة',
  'France': 'فرنسا',
  'Germany': 'ألمانيا',
  'Italy': 'إيطاليا',
  'Spain': 'إسبانيا',
  'Turkey': 'تركيا',
};

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  arabicLabel: arabicNames[country.name.common] || country.name.common, // استخدام الاسم العربي إذا كان متوفراً
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;
