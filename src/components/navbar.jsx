import { Link, useNavigate } from "react-router-dom";
import SpeedDialMenu from "./SpeedDailMenu";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./lang";
import { useTranslation } from "react-i18next";
import { BellIcon } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { BASE_URL } from "../utils/instance";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [newNotifications, setNewNotifications] = useState(0);
  const navigate = useNavigate();
  const TOKEN = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  // Функция опроса API для получения количества новых уведомлений
  const fetchNewNotificationsCount = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const response = await fetch(`${BASE_URL}/notifications/unread?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setNewNotifications(data.count);
      }
    } catch (error) {
      console.error("Ошибка получения количества уведомлений:", error);
    }
  };

  useEffect(() => {
    fetchNewNotificationsCount();
    const intervalId = setInterval(fetchNewNotificationsCount, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleNotifClick = () => {
    setNewNotifications(0);
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-2xl mx-auto ml-5 p-4 flex items-center justify-between">
        {/* Левая секция: Логотип */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Используется только «светлый» логотип */}
          <svg
            width="105"
            height="60"
            viewBox="0 0 105 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.2287 48.305C18.0741 52.1619 15.362 58.4225 22.2434 58.4225H23.6433C34.5695 58.4225 56.7423 45.1298 63.4578 40.3189C60.9493 40.2018 59.484 41.5091 57.53 42.6147C55.656 43.6754 53.9666 44.5814 52.0171 45.5065C48.1682 47.3332 44.2785 49.1555 40.0432 50.5596C29.3582 54.1022 20.3029 53.4992 28.4583 42.7049C29.0434 41.9306 29.9404 41.0368 30.3104 40.3244C29.0139 40.2643 28.502 40.9927 27.7414 41.7534C24.9429 44.5523 25.0606 43.6196 21.2287 48.305Z"
              fill="#0550B2"
            />
            <path
              d="M37.5177 29.1374C37.0134 30.8368 34.9294 37.1992 34.9268 38.4895L40.3232 38.4858L43.4045 27.2814C44.1138 28.0396 47.5569 34.9425 48.6368 36.926C49.322 38.1846 50.0107 38.8002 51.8722 38.7801C54.8558 38.7479 55.4971 35.9056 56.6525 33.8027C57.7308 31.8405 59.3276 29.1322 60.0339 27.1169C60.1585 27.2849 60.1713 27.2701 60.3011 27.5843L60.88 29.808C61.1577 30.8619 61.3958 31.7355 61.6671 32.7473C62.0561 34.1987 62.7954 37.4272 63.3469 38.4895H68.802C68.8217 37.3725 66.7215 30.7304 66.2598 29.1169C65.5523 26.643 64.5031 21.4486 62.9763 20.2569C61.5041 19.1078 59.4869 19.6548 58.5089 20.7318C57.3354 22.0242 52.535 31.4668 51.8738 32.2515C51.1425 31.0507 50.5086 29.6004 49.7629 28.3376C48.8922 26.8626 46.0808 21.5318 45.2947 20.6719C44.2383 19.5165 42.222 19.2682 40.7817 20.2706C39.413 21.2232 38.1926 26.8624 37.5177 29.1374Z"
              fill="#0550B2"
            />
            <path
              d="M89.1998 38.5006C90.3829 38.3963 92.9293 34.8322 93.4576 33.727C90.0174 33.727 86.5768 33.7254 83.1367 33.727C79.4453 33.7287 76.7317 33.7229 75.4581 30.8703C74.0613 27.7416 76.8777 25.1985 79.4297 24.8453C82.0959 24.4764 86.987 24.7696 89.8887 24.7655C90.9581 23.2572 92.5586 21.5669 93.5062 19.9199C89.1092 19.9199 79.9723 19.4368 76.2858 20.5481C65.4472 23.816 67.6807 38.0763 80.3337 38.4766C82.7286 38.5525 86.9261 38.7014 89.1998 38.5006Z"
              fill="#0550B2"
            />
            <path
              d="M10.0089 28.8992C13.6489 33.1392 23.9082 29.5624 27.8609 31.5031L27.8851 33.2237C26.0117 34.2653 15.0071 33.7272 11.9596 33.7272C11.4328 34.4888 10.7775 35.2267 10.1593 36.0718C9.71687 36.6766 8.69505 38.0986 8.40039 38.4364L26.4321 38.4567C35.6522 37.9774 34.011 30.311 32.0445 28.7922C28.5868 26.1218 17.985 28.0114 15.4378 27.2157C14.1361 26.8091 14.0852 25.0903 15.7148 24.8175C16.8081 24.6348 19.1571 24.7665 20.3777 24.7665C23.2177 24.7665 26.6068 24.933 29.3797 24.7255L32.969 19.9465C28.5764 19.7667 23.8715 19.9211 19.4445 19.9201C15.2023 19.9191 10.6169 20.0029 9.31863 23.5641C8.63293 25.4451 8.93977 27.654 10.0089 28.8992Z"
              fill="#0550B2"
            />
            <path
              d="M65.1994 11.5505C61.5564 13.6412 61.8437 13.9792 58.8453 12.4132C59.1783 15.6151 57.6899 15.9752 55.7148 17.2356L55.6376 17.2846C54.6945 17.8863 51.5201 19.9107 50.8809 20.6547C55.554 18.5811 58.504 13.8225 61.5855 17.0638C61.2701 13.6137 62.2104 13.7411 64.6732 12.4255C70.1808 9.48388 75.6988 6.74793 81.8429 4.86962C84.7302 3.98676 93.4264 1.5814 94.6376 5.3977C95.7792 8.99374 90.3892 14.4166 89.1281 16.1947C90.0186 15.7105 92.6286 12.6622 93.4335 11.557C101.056 1.09249 93.9432 0.0769454 83.9191 3.21013C77.9782 5.06732 70.5483 8.48043 65.1994 11.5505Z"
              fill="#0550B2"
            />
          </svg>
        </Link>

        {/* Центральная секция: Навигационные ссылки */}
        <div
className={`${
  isMenuOpen ? "grid" : "hidden"
} absolute top-20 right-0 w-23% bg-white rounded-xl text-left px-8 z-10 grid-cols-1 gap-y-2 p-4 md:relative md:block md:top-auto md:left-auto md:w-auto md:grid-cols-none md:gap-y-0 md:p-0`}
onMouseLeave={() => setIsMenuOpen(false)} // Закрывает меню при уходе курсора
>
<ul className="grid grid-cols-1 gap-y-2 md:flex md:flex-row md:space-x-6 md:gap-y-0 text-gray-900">
  <li className="flex items-center md:items-center transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
    {isMenuOpen && (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 122.88 108.22"
        className="w-5 h-5 fill-blue-700 mr-2 md:hidden"
      >
        <path d="M58.55,89.98l0.2-0.15v-7.77H3.02c-0.83,0-1.58-0.34-2.13-0.89C0.34,80.63,0,79.87,0,79.05c0-0.83,0.34-1.58,0.89-2.13 c0.55-0.55,1.3-0.89,2.13-0.89h8V14.15h-8c-0.83,0-1.58-0.34-2.13-0.89L0.83,13.2C0.32,12.66,0,11.93,0,11.13 C0,10.31,0.34,9.55,0.89,9c0.55-0.55,1.3-0.89,2.13-0.89h55.4V3.02c0-0.83,0.34-1.58,0.89-2.13C59.86,0.34,60.61,0,61.44,0 c0.82,0,1.58,0.34,2.13,0.89c0.55,0.55,0.89,1.3,0.89,2.13v5.09h55.4c0.82,0,1.58,0.34,2.13,0.89s0.89,1.31,0.89,2.13 c0,0.82-0.34,1.58-0.89,2.13c-0.55,0.55-1.3,0.9-2.13,0.9h-7.89v38.92l-6-2.81V14.15h-88.9v61.87h74.99l3.44,6.04H64.75v8.08 c4.07,4.22,8.82,8.17,13,12.34c0.57,0.57,0.87,1.32,0.89,2.07c0.02,0.75-0.25,1.51-0.81,2.09l-0.08,0.08 c-0.57,0.57-1.32,0.87-2.07,0.89c-0.76,0.02-1.51-0.25-2.09-0.8c-2.87-2.83-5.91-5.6-8.84-8.37v6.75c0,0.83-0.34,1.58-0.89,2.13 l-0.06,0.06c-0.54,0.51-1.27,0.83-2.07,0.83c-0.82,0-1.58-0.34-2.13-0.89l0,0c-0.55-0.55-0.89-1.31-0.89-2.13v-7.15 c-3.05,2.89-6.14,6-9.26,8.79c-0.6,0.55-1.36,0.81-2.1,0.79c-0.75-0.02-1.49-0.32-2.05-0.91l-0.08-0.09 c-0.55-0.6-0.81-1.36-0.79-2.1c0.02-0.75,0.32-1.5,0.91-2.05c4.36-4.05,8.66-8.23,12.98-12.33C58.39,90.08,58.46,90.03,58.55,89.98 L58.55,89.98z M95.72,54.98l-1.69-1.69c-0.18-0.18-0.43-0.25-0.66-0.21l-5.68,0.63c-0.41,0.05-0.71,0.42-0.66,0.83 c0.02,0.18,0.1,0.33,0.22,0.45l0,0l4.23,4.23l-0.3,0.3c-0.29,0.29-0.29,0.77,0,1.06l1.33,1.33l0,0l0.02,0.02 c0.05,0.05,0.11,0.11,0.15,0.18c0.05,0.06,0.09,0.14,0.12,0.21c0.26,0.56,0.15,1.78,0.07,2.73l0,0c-0.02,0.27-0.05,0.53-0.06,0.7 c-0.16,1.25,0.64,1.98,1.44,2.7c-0.22,0.35-0.33,0.76-0.34,1.16c0,0.52,0.18,1.04,0.56,1.43c0.04,0.04,0.09,0.08,0.15,0.13 l16.34,13.25c0.45,0.36,1,0.56,1.53,0.56c0.54,0,1.07-0.19,1.49-0.61l7.27-7.27c0.42-0.42,0.62-0.96,0.62-1.5 c0-0.54-0.2-1.09-0.58-1.53l-13.64-15.96c-0.04-0.05-0.08-0.09-0.1-0.11c-0.4-0.4-0.92-0.58-1.46-0.58c-0.4,0-0.8,0.12-1.16,0.33 c-0.72-0.8-1.44-1.6-2.7-1.44c-0.26,0.02-0.47,0.03-0.7,0.05l0,0c-0.95,0.08-2.17,0.19-2.73-0.07c-0.08-0.04-0.15-0.08-0.21-0.12 c0.02,0,0.04,0,0.06,0c0.02,0,0.04,0,0.06,0c-0.01-0.02-0.03-0.03-0.05-0.05l-1.33-1.33c-0.29-0.29-0.77-0.29-1.06,0l-0.31,0.31 L95.72,54.98L95.72,54.98z M92.77,60.05l0.31-0.3l3.18-3.18l0.3-0.3l0.82,0.82c0.11,0.12,0.24,0.22,0.37,0.31 c0.15,0.1,0.3,0.19,0.45,0.26c0.92,0.43,2.36,0.3,3.49,0.2l0,0c0.28-0.02,0.54-0.05,0.68-0.06l0.06-0.01 c0.49-0.07,0.96,0.45,1.42,0.97l-8.57,8.57c-0.52-0.46-1.04-0.93-0.97-1.42l0.01-0.06c0.01-0.24,0.03-0.46,0.05-0.68h0 c0.1-1.12,0.23-2.56-0.2-3.49c-0.07-0.16-0.16-0.31-0.26-0.45c-0.1-0.13-0.21-0.26-0.34-0.39l0,0L92.77,60.05L92.77,60.05 L92.77,60.05z M87.71,45.11l6,0.67c-0.33,1.25-0.87,2.34-1.63,3.26c-0.75,0.92-1.72,1.63-2.9,2.14c-1.17,0.51-2.66,0.76-4.47,0.76 c-1.75,0-3.21-0.16-4.37-0.49c-1.16-0.33-2.16-0.86-3-1.59c-0.84-0.73-1.49-1.58-1.97-2.57c-0.48-0.98-0.71-2.29-0.71-3.91 c0-1.69,0.29-3.11,0.87-4.23c0.42-0.83,1.01-1.57,1.74-2.23c0.74-0.66,1.49-1.15,2.27-1.47c1.23-0.51,2.81-0.76,4.73-0.76 c2.69,0,4.74,0.48,6.16,1.44c1.41,0.96,2.4,2.37,2.98,4.21l-5.94,0.79c-0.19-0.7-0.52-1.23-1.02-1.59 c-0.49-0.35-1.15-0.53-1.98-0.53c-1.04,0-1.89,0.38-2.54,1.12c-0.65,0.75-0.97,1.89-0.97,3.41c0,1.36,0.32,2.38,0.96,3.09 c0.64,0.7,1.46,1.05,2.45,1.05c0.83,0,1.52-0.21,2.09-0.63C87.01,46.62,87.43,45.98,87.71,45.11L87.71,45.11z M51.62,28.81H58v7.86 c0.63-0.66,1.34-1.15,2.15-1.49c0.8-0.33,1.68-0.49,2.66-0.49c2.01,0,3.66,0.72,4.98,2.17c1.31,1.45,1.97,3.52,1.97,6.23 c0,1.8-0.3,3.39-0.9,4.76c-0.6,1.37-1.43,2.4-2.49,3.08c-1.06,0.68-2.23,1.02-3.53,1.02c-1.11,0-2.12-0.24-3.04-0.71 c-0.69-0.38-1.45-1.07-2.27-2.11v2.44h-5.92V28.81L51.62,28.81z M57.95,43.25c0,1.42,0.26,2.46,0.8,3.09 c0.53,0.64,1.2,0.96,2.02,0.96c0.75,0,1.39-0.31,1.89-0.94c0.51-0.63,0.77-1.68,0.77-3.17c0-1.31-0.25-2.27-0.75-2.88 c-0.5-0.61-1.11-0.92-1.82-0.92c-0.86,0-1.56,0.32-2.1,0.96C58.22,40.98,57.95,41.95,57.95,43.25L57.95,43.25z M33.22,40.41 l-6.03-0.64c0.23-1.06,0.56-1.89,0.98-2.49c0.43-0.61,1.04-1.13,1.85-1.58c0.58-0.32,1.37-0.57,2.38-0.75 c1.01-0.17,2.11-0.26,3.29-0.26c1.89,0,3.4,0.11,4.55,0.32c1.14,0.21,2.1,0.66,2.86,1.33c0.54,0.47,0.96,1.13,1.27,1.98 c0.31,0.85,0.47,1.67,0.47,2.45v7.28c0,0.78,0.05,1.39,0.15,1.83c0.09,0.44,0.31,1,0.64,1.68h-5.91c-0.24-0.42-0.39-0.74-0.47-0.96 c-0.07-0.22-0.14-0.57-0.22-1.04c-0.83,0.79-1.65,1.36-2.47,1.7c-1.12,0.46-2.41,0.68-3.89,0.68c-1.96,0-3.46-0.45-4.47-1.37 c-1.02-0.91-1.53-2.04-1.53-3.37c0-1.25,0.37-2.29,1.1-3.1c0.74-0.81,2.09-1.41,4.07-1.81c2.37-0.48,3.9-0.81,4.61-1.01 c0.7-0.19,1.45-0.44,2.23-0.75c0-0.78-0.16-1.32-0.48-1.63c-0.32-0.31-0.88-0.47-1.68-0.47c-1.03,0-1.81,0.16-2.32,0.5 C33.79,39.2,33.47,39.69,33.22,40.41L33.22,40.41z M38.68,43.71c-0.87,0.31-1.77,0.59-2.72,0.83c-1.28,0.34-2.1,0.68-2.44,1.02 C33.17,45.9,33,46.29,33,46.73c0,0.5,0.17,0.92,0.52,1.23c0.35,0.32,0.86,0.48,1.53,0.48c0.7,0,1.36-0.17,1.97-0.52 c0.6-0.34,1.03-0.76,1.29-1.26c0.25-0.5,0.38-1.14,0.38-1.94V43.71L38.68,43.71z" />
      </svg>
    )}
    <a href="https://training.cmspace.uz/courses" className="hover:text-blue-800">
      {t("Курсы")}
    </a>
  </li>
  <li className="flex items-center md:items-center transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
    {isMenuOpen && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 443 511.529"
        className="w-5 h-5 fill-blue-700 mr-2 md:hidden"
      >
        <path d="M52.307 56.129h3.835v-3.822C56.142 23.598 79.74 0 108.449 0h282.244C419.416 0 443 23.585 443 52.307V403.08c0 28.548-23.759 52.307-52.307 52.307h-3.826v3.835c0 28.548-23.759 52.307-52.307 52.307H52.307C23.695 511.529 0 487.829 0 459.222V108.441c0-28.71 23.598-52.312 52.307-52.312z" />
        <path
          fill="#fff"
          d="M52.307 78.577h3.835V403.08c0 28.607 23.695 52.307 52.307 52.307h255.97v3.835c0 16.268-13.591 29.859-29.859 29.859H52.307c-16.268 0-29.859-13.43-29.859-29.859V108.441c0-16.43 13.431-29.864 29.859-29.864z"
        />
        <path d="M108.448 22.446h282.244c16.428 0 29.86 13.592 29.86 29.861V403.08c0 16.268-13.592 29.86-29.86 29.86H108.448c-16.268 0-29.86-13.433-29.86-29.86V52.307c0-16.428 13.433-29.861 29.86-29.861z" />
        <path
          fill="#88BCF4"
          fillRule="nonzero"
          d="M160.374 150.38c-6.197 0-11.224-5.026-11.224-11.224 0-6.197 5.027-11.224 11.224-11.224h178.39c6.197 0 11.224 5.027 11.224 11.224 0 6.198-5.027 11.224-11.224 11.224h-178.39zm0 165.843c-6.197 0-11.224-5.027-11.224-11.225 0-6.197 5.027-11.224 11.224-11.224h87.117c6.197 0 11.224 5.027 11.224 11.224 0 6.198-5.027 11.225-11.224 11.225h-87.117zm0-82.922c-6.197 0-11.224-5.026-11.224-11.224 0-6.197 5.027-11.224 11.224-11.224h178.39c6.197 0 11.224 5.027 11.224 11.224 0 6.198-5.027 11.224-11.224 11.224h-178.39z"
        />
      </svg>
    )}
    <a href="https://training.cmspace.uz/articles" className="hover:text-blue-800">
      {t("Статьи")}
    </a>
  </li>
  <li className="flex items-center md:items-center transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
    {isMenuOpen && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        viewBox="0 0 512 512"
        className="w-5 h-5 fill-blue-700 mr-2 md:hidden"
      >
        <path d="M255.99 0c70.68 0 134.7 28.66 181.02 74.98C483.33 121.3 512 185.31 512 256c0 70.68-28.67 134.69-74.99 181.01C390.69 483.33 326.67 512 255.99 512S121.3 483.33 74.98 437.01C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 255.99 0zm77.4 269.81c13.75-8.88 13.7-18.77 0-26.63l-110.27-76.77c-11.19-7.04-22.89-2.9-22.58 11.72l.44 154.47c.96 15.86 10.02 20.21 23.37 12.87l109.04-75.66zm79.35-170.56c-40.1-40.1-95.54-64.92-156.75-64.92-61.21 0-116.63 24.82-156.74 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.22 24.82 116.64 64.92 156.74 40.11 40.11 95.53 64.93 156.74 64.93 61.21 0 116.65-24.82 156.75-64.93 40.11-40.1 64.93-95.52 64.93-156.74 0-61.22-24.82-116.64-64.93-156.75z" />
      </svg>
    )}
    <a href="https://training.cmspace.uz/videos" className="hover:text-blue-800">
      {t("Видео")}
    </a>
  </li>
  <li className="flex items-center md:items-center transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
    {isMenuOpen && (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 122.88 101.37"
        className="w-5 h-5 fill-blue-700 mr-2 md:hidden"
      >
        <path d="M12.64,77.27l0.31-54.92h-6.2v69.88c8.52-2.2,17.07-3.6,25.68-3.66c7.95-0.05,15.9,1.06,23.87,3.76 c-4.95-4.01-10.47-6.96-16.36-8.88c-7.42-2.42-15.44-3.22-23.66-2.52c-1.86,0.15-3.48-1.23-3.64-3.08 C12.62,77.65,12.62,77.46,12.64,77.27L12.64,77.27z M103.62,19.48c-0.02-0.16-0.04-0.33-0.04-0.51c0-0.17,0.01-0.34,0.04-0.51V7.34 c-7.8-0.74-15.84,0.12-22.86,2.78c-6.56,2.49-12.22,6.58-15.9,12.44V85.9c5.72-3.82,11.57-6.96,17.58-9.1 c6.85-2.44,13.89-3.6,21.18-3.02V19.48L103.62,19.48z M110.37,15.6h9.14c1.86,0,3.37,1.51,3.37,3.37v77.66 c0,1.86-1.51,3.37-3.37,3.37c-0.38,0-0.75-0.06-1.09-0.18c-9.4-2.69-18.74-4.48-27.99-4.54c-9.02-0.06-18.03,1.53-27.08,5.52 c-0.56,0.37-1.23,0.57-1.92,0.56c-0.68,0.01-1.35-0.19-1.92-0.56c-9.04-4-18.06-5.58-27.08-5.52c-9.25,0.06-18.58,1.85-27.99,4.54 c-0.34,0.12-0.71,0.18-1.09,0.18C1.51,100.01,0,98.5,0,96.64V18.97c0-1.86,1.51-3.37,3.37-3.37h9.61l0.06-11.26 c0.01-1.62,1.15-2.96,2.68-3.28l0,0c8.87-1.85,19.65-1.39,29.1,2.23c6.53,2.5,12.46,6.49,16.79,12.25 c4.37-5.37,10.21-9.23,16.78-11.72c8.98-3.41,19.34-4.23,29.09-2.8c1.68,0.24,2.88,1.69,2.88,3.33h0V15.6L110.37,15.6z M68.13,91.82c7.45-2.34,14.89-3.3,22.33-3.26c8.61,0.05,17.16,1.46,25.68,3.66V22.35h-5.77v55.22c0,1.86-1.51,3.37-3.37,3.37 c-0.27,0-0.53-0.03-0.78-0.09c-7.38-1.16-14.53-0.2-21.51,2.29C79.09,85.15,73.57,88.15,68.13,91.82L68.13,91.82z M58.12,85.25 V22.46c-3.53-6.23-9.24-10.4-15.69-12.87c-7.31-2.8-15.52-3.43-22.68-2.41l-0.38,66.81c7.81-0.28,15.45,0.71,22.64,3.06 C47.73,78.91,53.15,81.64,58.12,85.25L58.12,85.25z" />
      </svg>
    )}
    <a href="https://training.cmspace.uz/books" className="hover:text-blue-800">
      {t("Книги")}
    </a>
  </li>
  <li className="flex items-center md:items-center transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
    {isMenuOpen && (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 122.88 71.04"
        className="w-5 h-5 fill-blue-700 mr-2 md:hidden"
      >
        <path
          className="st0"
          d="M91.95,64.68l1.99-7.59l-1.37-1.5c-0.62-0.9-0.75-1.69-0.41-2.37c0.74-1.47,2.28-1.2,3.72-1.2 c1.51,0,3.37-0.29,3.84,1.6c0.16,0.63-0.04,1.29-0.48,1.97l-1.37,1.5l1.19,4.56l7.89-6.86l4.09,0.1c-1.41-2.83-3.2-5.23-5.28-7.49 c3.92,1.52,7.93,3.02,10.9,4.88c1.89,1.18,2.86,2.08,3.63,3.51c1.62,3.05,1.8,5.78,2.04,9.08l0.57,2.86h-22.24l0.02,0.07h-8.51 c-0.19,1.95-1.31,3.08-3.5,3.24H61.68H34.24c-2.2-0.17-3.32-1.3-3.5-3.27l0.76-12.04c0.21-2.78,0.99-4.98,2.26-6.66 c0.84-1.11,1.88-1.93,3.03-2.57c3.65-2.03,12.17-2.63,15.48-5.61l5.07,14.91l2.55-8.85l-1.25-1.37c-0.56-0.82-0.69-1.54-0.37-2.16 c0.68-1.34,2.08-1.09,3.39-1.09c1.37,0,3.06-0.26,3.49,1.46c0.14,0.57-0.04,1.17-0.44,1.79l-1.25,1.37l2.55,8.85l4.59-14.91 c3.31,2.98,11.84,3.58,15.48,5.61c1.15,0.64,2.2,1.46,3.03,2.57c1.27,1.68,2.05,3.87,2.26,6.66L91.95,64.68L91.95,64.68z M15.29,48.25l3.4,9.99l1.71-5.93l-0.84-0.92c-0.38-0.55-0.46-1.03-0.25-1.45c0.45-0.9,1.39-0.73,2.27-0.73 c0.92,0,2.05-0.17,2.34,0.98c0.1,0.38-0.03,0.79-0.29,1.2l-0.84,0.92l1.71,5.93l3.08-9.99c0.45,0.4,1.07,0.74,1.8,1.03 c-0.25,0.53-0.48,1.09-0.68,1.67c-0.52,1.51-0.86,3.19-1,5.06l0.01,0c0,0.04-0.01,0.09-0.01,0.13l-0.74,11.58h-5.35H2.35 C0.87,67.61,0.12,66.85,0,65.53l0.51-7.34c0.14-1.86,0.67-3.33,1.52-4.46c0.56-0.74,1.26-1.29,2.03-1.72 C6.5,50.65,13.07,50.25,15.29,48.25L15.29,48.25z M13.62,34.09c-0.33,0.03-0.58,0.1-0.76,0.22c-0.1,0.07-0.18,0.16-0.23,0.26 c-0.06,0.12-0.08,0.28-0.08,0.45c0.02,0.55,0.31,1.29,0.88,2.14l0.01,0.02l0,0l1.9,3.02c0.76,1.2,1.55,2.43,2.53,3.33 c0.93,0.85,2.06,1.43,3.56,1.43c1.62,0,2.8-0.6,3.77-1.5c1.01-0.95,1.81-2.25,2.6-3.55l2.13-3.51c0.43-0.98,0.56-1.57,0.42-1.85 c-0.09-0.17-0.44-0.22-1.02-0.17c-0.37,0.08-0.76,0.01-1.17-0.2l1.07-3.2c-3.91-0.05-6.58-0.73-9.75-2.75 c-1.04-0.66-1.35-1.42-2.39-1.35c-0.79,0.15-1.45,0.5-1.97,1.07c-0.5,0.54-0.88,1.28-1.13,2.23l0.63,3.83 C14.3,34.21,13.96,34.23,13.62,34.09L13.62,34.09z M30.55,33.14c0.46,0.14,0.8,0.4,1,0.81c0.32,0.65,0.2,1.62-0.41,3l0,0 c-0.01,0.03-0.02,0.05-0.04,0.08l-2.16,3.56c-0.84,1.38-1.69,2.76-2.83,3.83c-1.19,1.12-2.66,1.86-4.67,1.85 c-1.88,0-3.29-0.72-4.45-1.78c-1.11-1.02-1.96-2.32-2.76-3.6l-1.9-3.02c-0.71-1.06-1.07-2.02-1.1-2.82 c-0.01-0.39,0.05-0.74,0.2-1.04c0.15-0.33,0.38-0.6,0.7-0.81c0.15-0.1,0.33-0.19,0.52-0.26c-0.12-1.62-0.16-3.62-0.08-5.3 c0.04-0.41,0.12-0.82,0.23-1.23c0.49-1.73,1.7-3.13,3.21-4.09c0.53-0.34,1.11-0.62,1.73-0.84c3.65-1.32,8.48-0.6,11.07,2.2 c1.05,1.14,1.72,2.65,1.86,4.65L30.55,33.14L30.55,33.14z M49.65,19.77c-0.42,0.05-0.75,0.16-0.99,0.32 c-0.15,0.1-0.27,0.24-0.34,0.39c-0.08,0.18-0.12,0.41-0.12,0.67c0.02,0.83,0.46,1.92,1.32,3.18l0.02,0.02h0l2.83,4.51 c1.13,1.8,2.31,3.63,3.77,4.96c1.39,1.27,3.08,2.13,5.3,2.14c2.42,0.01,4.18-0.89,5.62-2.23c1.51-1.41,2.71-3.36,3.89-5.3 l3.18-5.24c0.64-1.46,0.84-2.34,0.63-2.76c-0.13-0.27-0.69-0.33-1.63-0.24c-0.07,0.01-0.14,0.01-0.21,0c-0.39,0-0.81-0.1-1.27-0.31 l1.43-4.78c-5.84-0.07-9.83-1.09-14.55-4.11c-1.55-0.99-2.02-2.12-3.57-2.01c-1.17,0.23-2.16,0.75-2.94,1.59 c-0.75,0.81-1.32,1.91-1.69,3.32l1.01,5.78C50.74,19.98,50.18,20,49.65,19.77L49.65,19.77z M75.05,18.34 c0.69,0.2,1.19,0.6,1.5,1.21c0.48,0.98,0.3,2.42-0.61,4.48l0,0c-0.02,0.04-0.04,0.08-0.06,0.11l-3.23,5.32 c-1.25,2.06-2.52,4.13-4.23,5.72c-1.78,1.67-3.97,2.78-6.97,2.77c-2.8-0.01-4.91-1.08-6.64-2.66c-1.66-1.52-2.92-3.46-4.12-5.37 l-2.83-4.51c-1.05-1.57-1.6-3.02-1.64-4.21c-0.02-0.58,0.08-1.1,0.3-1.56c0.23-0.49,0.57-0.9,1.04-1.21 c0.23-0.16,0.49-0.29,0.78-0.39c-0.17-2.41-0.23-5.39-0.12-7.9c0.06-0.61,0.18-1.22,0.35-1.83c0.72-2.59,2.54-4.67,4.79-6.1 c0.79-0.5,1.66-0.92,2.58-1.25c5.44-1.97,12.66-0.89,16.52,3.29c1.57,1.7,2.56,3.96,2.77,6.94L75.05,18.34L75.05,18.34z M84.88,42.96l2.5-0.07l2.07-0.05c-2.42-7.45-1.61-14.3,4.22-20.12c0.99,3.2,3.2,5.83,6.97,7.78c1.8,1.34,3.55,2.96,5.23,4.81 c0.3-1.23-0.84-2.73-2.23-4.27c1.28,0.63,2.46,1.52,3.29,3.22c0.97,1.98,0.95,3.64,0.64,5.79c-0.15,1-0.39,1.93-0.74,2.78h3.45 c3.64-7.79,1.33-19.34-6.11-24.24c-2.28-1.5-3.92-1.45-6.6-1.44c-3.07,0-4.63,0.1-7.26,1.83c-3.87,2.56-6.25,6.99-7.25,13.14 C82.87,35.19,82.74,40.49,84.88,42.96L84.88,42.96z"
        />
      </svg>
    )}
    <a href="https://training.cmspace.uz/youth-projects" className="hover:text-blue-800">
      {t("Молодёжные проекты")}
    </a>
  </li>
  <li className="flex items-center md:items-center transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
    {isMenuOpen && (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="122.88px"
        height="122.88px"
        viewBox="0 0 122.88 122.88"
        className="w-5 h-5 fill-blue-700 mr-2 md:hidden"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M61.44,0c33.926,0,61.44,27.514,61.44,61.44c0,33.926-27.514,61.439-61.44,61.439 C27.513,122.88,0,95.366,0,61.44C0,27.514,27.513,0,61.44,0L61.44,0z M79.42,98.215H43.46v-6.053h6.757v-36.96H43.46v-4.816h16.808 c4.245,0,8.422-0.51,12.549-1.551v43.328h6.604V98.215L79.42,98.215z M63.859,21.078c2.785,0,4.975,0.805,6.571,2.396 c1.579,1.59,2.377,3.771,2.377,6.581c0,2.848-1.358,5.381-4.093,7.601c-2.751,2.22-5.941,3.338-9.577,3.338 c-2.733,0-4.905-0.765-6.569-2.297c-1.665-1.551-2.497-3.556-2.497-6.05c0-3.143,1.358-5.853,4.059-8.152 C56.83,22.219,60.072,21.078,63.859,21.078L63.859,21.078z"
        />
      </svg>
    )}
    <a href="https://training.cmspace.uz/about" className="hover:text-blue-800">
      {t("О нас")}
    </a>
  </li>
  <li className="flex items-center md:items-center transition-all duration-200 ease-in-out transform hover:-translate-y-0.5">
    {isMenuOpen && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 512"
        className="w-5 h-5 fill-blue-700 mr-2 md:hidden"
      >
        <path
          fillRule="nonzero"
          d="M255.998 0c70.69 0 134.694 28.657 181.017 74.981C483.342 121.308 512 185.309 512 255.998c0 70.69-28.655 134.694-74.985 181.017C390.692 483.345 326.688 512 255.998 512c-70.689 0-134.69-28.658-181.017-74.985C28.657 390.692 0 326.688 0 255.998c0-70.689 28.657-134.687 74.981-181.017C121.311 28.657 185.309 0 255.998 0zm-73.807 349.762V162.24h97.212c18.002 0 30.854 3.499 38.554 10.5 7.7 7.001 11.551 17.203 11.551 30.604 0 13.403-2.448 23.753-7.349 31.054-4.902 7.301-11.452 12.053-19.654 14.251v1.802c24.204 4.199 36.304 20.702 36.304 49.504 0 15.002-4 27.054-12.001 36.157-8.001 9.1-20.303 13.65-36.902 13.65H182.191zm83.412-74.708h-31.415v30.604h31.115c8.4 0 12.599-5.102 12.599-15.302 0-10.202-4.121-15.302-12.299-15.302zm-4.502-71.71h-26.913v27.904H260.8c7.602 0 11.401-4.65 11.401-13.951s-3.721-13.953-11.1-13.953zm148.722-101.171C370.461 62.812 316.071 38.46 255.998 38.46c-60.072 0-114.46 24.352-153.825 63.713-39.361 39.365-63.713 93.753-63.713 153.825 0 60.073 24.352 114.463 63.713 153.825 39.365 39.365 93.753 63.716 153.825 63.716 60.073 0 114.463-24.351 153.825-63.716 39.365-39.362 63.716-93.752 63.716-153.825 0-60.072-24.351-114.46-63.716-153.825z"
        />
      </svg>
    )}
    <Link to="/" className="text-blue-700 hover:text-blue-800">
      {t("Блоги")}
    </Link>
  </li>
</ul>
</div>

        {/* Правая секция: Кнопки и ссылки */}
        <div className="flex items-center space-x-4 ml-5 mr-14">
          <nav>
            <LanguageSwitcher />
          </nav>

          <Link
            to="/beditor"
            className="w-10 h-10 flex items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-full cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-5 text-white"
            >
              <path d="M12 0c.828 0 1.5.672 1.5 1.5V10.5H22.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5H13.5V22.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V13.5H1.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5H10.5V1.5C10.5.672 11.172 0 12 0z" />
            </svg>
          </Link>
          <div className="relative">
            <Link
              to="/notifpage"
              onClick={handleNotifClick}
              className="w-10 h-10 flex items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-full cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <BellIcon className="w-5 h-5 fill-white stroke-white" />
            </Link>
            {newNotifications > 0 && (
              <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {newNotifications}
              </div>
            )}
          </div>

          {TOKEN ? (
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center px-2.5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          ) : (
            <Link
              to="/signup"
              className="w-10 h-10 flex items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-full cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}

          <SpeedDialMenu />

          {/* Бургер-меню для мобильных устройств */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-10 h-10 text-white bg-blue-700 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className={`w-6 h-6 transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={`${
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12" // крестик
                      : "M4 6h16M4 12h16M4 18h16" // три полоски
                  }`}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;