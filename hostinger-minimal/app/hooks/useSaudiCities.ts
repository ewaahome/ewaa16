import { SaudiCityValue } from '@/app/types';

const saudiCities: SaudiCityValue[] = [
  {
    id: 'riyadh',
    label: 'الرياض',
    value: 'riyadh',
    image: 'https://plus.unsplash.com/premium_photo-1697729683785-adfae2f6564b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cml5YWRofGVufDB8fDB8fHww',
    latlng: [24.7136, 46.6753],
  },
  {
    id: 'makkah',
    label: 'مكة',
    value: 'makkah',
    image: 'https://images.pexels.com/photos/5004002/pexels-photo-5004002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    latlng: [21.3891, 39.8579],
  },
  {
    id: 'taif',
    label: 'الطائف',
    value: 'taif',
    image: 'https://blog.wasalt.sa/en/wp-content/uploads/2024/07/Taif-City-1-750x333.jpg',
    latlng: [21.2702, 40.4167],
  },
  {
    id: 'madinah',
    label: 'المدينة',
    value: 'madinah',
    image: 'https://images.pexels.com/photos/24284829/pexels-photo-24284829/free-photo-of-tombs-of-prophet-muhammad-and-caliphs-in-medina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    latlng: [24.5247, 39.5692],
  },
  {
    id: 'yanbu',
    label: 'ينبع',
    value: 'yanbu',
    image: 'https://yawmiyati.com/assets/media/%D8%B9%D8%A7%D9%84%D9%85%D9%8A-%D9%8A%D9%88%D9%85%D9%8A%D8%A7%D8%AA%D9%8A/%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9_%D9%88%D8%B3%D9%81%D8%B1_1/%D8%A7%D8%B1%D9%88%D8%B9_%D8%A7%D9%84%D8%A7%D9%85%D8%A7%D9%83%D9%86_%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D9%8A%D8%A9_%D9%81%D9%8A_%D9%8A%D9%86%D8%A8%D8%B9.jpg',
    latlng: [24.0231, 38.1899],
  },
  {
    id: 'qassim',
    label: 'القصيم',
    value: 'qassim',
    image: 'https://www.al-madina.com/uploads/images/2021/12/28/1986933.jpg',
    latlng: [26.3292, 43.7665],
  },
  {
    id: 'hail',
    label: 'حائل',
    value: 'hail',
    image: 'https://cdn.alweb.com/thumbs/travel/article/fit710x532/%D9%85%D9%82%D9%88%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9-%D9%81%D9%8A-%D8%AD%D8%A7%D8%A6%D9%84.jpg',
    latlng: [27.5114, 41.7267],
  },
  {
    id: 'jeddah',
    label: 'جدة',
    value: 'jeddah',
    image: 'https://images.pexels.com/photos/4614473/pexels-photo-4614473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    latlng: [21.5433, 39.1728],
  },
  {
    id: 'dammam',
    label: 'الدمام',
    value: 'dammam',
    image: 'https://media.istockphoto.com/id/1307620663/photo/beautiful-al-khobar-corniche-mosque-morning-view-khobar-saudi-arabia.jpg?s=612x612&w=0&k=20&c=vQ7ddQ_vTtXDCfsgtWkPT7pKjY0liOiw_YfSZlriTPw=',
    latlng: [26.4344, 50.1033],
  },
  {
    id: 'abha',
    label: 'أبها',
    value: 'abha',
    image: 'https://blog.wasalt.sa/en/wp-content/uploads/2024/07/abha-city-1.jpg',
    latlng: [18.2164, 42.5053],
  },
  {
    id: 'alula',
    label: 'العلا',
    value: 'alula',
    image: 'https://www.al-madina.com/uploads/images/2025/03/06/2391985.jpg',
    latlng: [26.6173, 37.9192],
  },
];

const useSaudiCities = () => {
  const getAll = () => saudiCities;

  const getByValue = (value: string) => {
    return saudiCities.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useSaudiCities; 