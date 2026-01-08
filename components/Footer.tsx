export default function Footer() {
    return (
        <>
            <div className="footer-wrapper text-[18px]">
                <div></div>
                <div />
                <div className="bg-gray-100 flex flex-col py-5">
                    <a href="/privacy-policy" className="footer-link">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="footer-link">
                        Terms of Service
                    </a>
                    <a href="/returns" className="footer-link">
                        Returns and Refund
                    </a>
                    <a href="/impressum" className="footer-link">
                        Impressum
                    </a>
                </div>
                <div className="bg-gray-100 py-5 max-[768px]:hidden" />
                <div className="bg-gray-100 py-5 flex flex-col max-[768px]:pt-0">
                    <a
                        href="mailto:info@queerluxvis.com"
                        className="footer-link"
                    >
                        info@queerluxvis.com
                    </a>
                    <br />
                    <a
                        href="https://x.com/QueerLuxVis"
                        className="footer-link"
                        target="_blank"
                    >
                        X
                    </a>
                    <a
                        href="https://www.instagram.com/queerluxvis/"
                        className="footer-link"
                        target="_blank"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.facebook.com/people/Queerluxvis/61577503179951/"
                        className="footer-link"
                        target="_blank"
                    >
                        Facebook
                    </a>
                </div>
            </div>
        </>
    );
}
