import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center mt-4">
            <p>&copy; {new Date().getFullYear()} Harsh Mahajan. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
