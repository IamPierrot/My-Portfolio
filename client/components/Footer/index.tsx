import { memo } from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 text-white">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Pierrot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
