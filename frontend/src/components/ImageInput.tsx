import{ useState } from 'react';

export function ImageInput({ imageUrl, setImg}: {setImg: any, imageUrl: string}) {
  const [image, setImage] = useState(imageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImg(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className='bg-white'>
      <input
        type="file"
        id="imageInput"
        className="hidden "
        accept="image/*"
        onChange={handleImageChange}
      />
      <div
        className={`h-64  border border-dashed flex bg-cover bg-centre items-center justify-center cursor-pointer `}
        style={{
          backgroundImage: image ? `url(${image})` : 'none',
        }}
        onClick={() => document.getElementById('imageInput')?.click()}
      >
        {!image && <div className='max-w-sm p-6'>Include a high-quality image in your story to make it more inviting to readers...</div>}
      </div>
    </div>
  );
};
