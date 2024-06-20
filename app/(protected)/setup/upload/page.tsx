import { UploadForm } from "./_components/upload-form";

const Page = async () => {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col items-center justify-center p-6">
      <UploadForm />
    </div>
  );
};

export default Page;
