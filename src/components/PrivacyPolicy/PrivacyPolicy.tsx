import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import Components
import Footer from "../Footer/Footer";

// Import SVG
import { Logo } from "../../svg";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center pt-12">

            {/* Logo clickable to redirect to the home page */}
            <Link to="/">
                <Logo widthValue={"100%"} color={"#201c1b"} />
            </Link>

            <div className="divider w-[70%] self-center" />

            {/* Privacy Policy Text*/}
            <div className="max-w-2xl text-sm sm:text-base mx-auto px-8 py-8 text-justify">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-4"><strong className="font-bold">Effective Date:</strong> 23/02/2024</p>
                <p className="mb-4"><strong>MyGuitarTabs</strong> ("we," "us," or "our") is committed to protecting the privacy of our users. This Privacy Policy outlines the types of information we collect when you use our web application, how we use and protect that information, and your rights regarding the information collected.</p>
                <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
                <p className="mb-4">When you use our web application, we may collect the following types of information:</p>
                <ul className="list-decimal ml-6 mb-4">
                    <li><strong className="font-bold">Personal Information:</strong> We may collect personal information such as your name, email address, and any other information you voluntarily provide to us when using our services.</li>
                    <li><strong className="font-bold">Usage Information:</strong> We may collect non-personal information about how you interact with our web application, such as your IP address, browser type, operating system, and pages visited.</li>
                </ul>
                <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect for the following purposes:</p>
                <ul className="list-decimal ml-6 mb-4">
                    <li>To provide and improve our web application and services.</li>
                    <li>To communicate with you regarding updates, announcements, and other information related to our services.</li>
                    <li>To analyze trends and usage patterns to enhance the user experience.</li>
                    <li>To comply with legal obligations and protect our rights.</li>
                </ul>
                <h2 className="text-xl font-bold mb-2">Data Security</h2>
                <p className="mb-4">We take reasonable measures to protect the information collected from loss, misuse, unauthorized access, disclosure, alteration, and destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                <h2 className="text-xl font-bold mb-2">Third-Party Services</h2>
                <p className="mb-4">Our web application may contain links to third-party websites or services that are not operated by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
                <h2 className="text-xl font-bold mb-2">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-decimal ml-6 mb-4">
                    <li>Access, update, or delete the personal information we hold about you.</li>
                    <li>Object to the processing of your personal information.</li>
                    <li>Opt-out of receiving promotional communications from us.</li>
                </ul>
                <h2 className="text-xl font-bold mb-2">Changes to This Privacy Policy</h2>
                <p className="mb-4">We reserve the right to update or change our Privacy Policy at any time. Any changes will be effective immediately upon posting the revised Privacy Policy on our website.</p>
            </div>

            {/* Button to go to the previous page */}
            <button className="btn btn-primary border border-base-200" onClick={() => navigate(-1)}>
                Go Back
            </button>

            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
