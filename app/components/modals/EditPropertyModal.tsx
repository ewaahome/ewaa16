'use client';

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";

interface EditPropertyModalProps {
  listingId: string;
  title: string;
  description: string;
  imageSrc: string;
  price: number;
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  listingId,
  title: currentTitle,
  description: currentDescription,
  imageSrc: currentImageSrc,
  price: currentPrice,
}) => {
  const router = useRouter();
  const editPropertyModal = useEditPropertyModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      title: currentTitle,
      description: currentDescription,
      imageSrc: currentImageSrc,
      price: currentPrice,
    }
  });

  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // التحقق من وجود صورة وإذا كانت صورة محلية (تبدأ بـ blob:)
    if (data.imageSrc && data.imageSrc.startsWith('blob:')) {
      // استخدام صورة افتراضية بدلاً من الصورة المحلية
      data.imageSrc = 'https://res.cloudinary.com/dzwkeydij/image/upload/v1701876720/property_images/default_property_image.jpg';
    }

    axios.put(`/api/listings/${listingId}`, data)
      .then(() => {
        toast.success('تم تعديل العقار بنجاح!');
        router.refresh();
        reset();
        editPropertyModal.onClose();
      })
      .catch(() => {
        toast.error('حدث خطأ ما.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="تعديل بيانات العقار"
        subtitle="قم بتحديث معلومات العقار الخاص بك"
      />
      <Input
        id="title"
        label="عنوان العقار"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        label="وصف العقار"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="السعر"
        formatPrice 
        type="number" 
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="mt-2">
        <div className="font-semibold mb-2">صورة العقار</div>
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={editPropertyModal.isOpen}
      onClose={editPropertyModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="تعديل"
      secondaryActionLabel="إلغاء"
      secondaryAction={editPropertyModal.onClose}
      title="تعديل العقار"
      body={bodyContent}
      disabled={isLoading}
    />
  );
}

export default EditPropertyModal; 