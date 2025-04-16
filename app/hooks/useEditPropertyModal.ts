import { create } from 'zustand';

interface EditPropertyModalStore {
  isOpen: boolean;
  listingData: {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    price: number;
  } | null;
  onOpen: (data: {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    price: number;
  }) => void;
  onClose: () => void;
}

const useEditPropertyModal = create<EditPropertyModalStore>((set) => ({
  isOpen: false,
  listingData: null,
  onOpen: (data) => set({ isOpen: true, listingData: data }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditPropertyModal; 