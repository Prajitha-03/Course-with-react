import React from "react";

const PdfModal = ({ lesson }) => {
  if (!lesson || !lesson.fileUrl) {
    return <div>No PDF available</div>;
  }

  return (
    <div className="w-full h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-hidden">
      <iframe
        src={lesson.fileUrl}
        width="100%"
        height="100%"
        title={lesson.title}
        className="rounded-md border shadow-md"
      ></iframe>
    </div>
  );
};

export default PdfModal;
