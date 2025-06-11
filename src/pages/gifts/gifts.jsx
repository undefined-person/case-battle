import Button from '../../shared/ui/button/button'
import Header from '../../shared/components/header/header'
import Card from '../../shared/ui/card/card'
import TonIcon from '../../shared/assets/icons/ton.svg?react'
import PeopleIcon from '../../shared/assets/icons/people.svg?react'
import TrophiesIcon from '../../shared/assets/icons/trophy.svg?react'
import Gift from '../../shared/assets/images/gift.png'

import styles from './gifts.module.scss'
export default function Gifts() {
  return (
    <div>
      <Header />
      <h1 className={styles.gifts_title}>Конкурсы</h1>
      <div className={styles.gifts_filters}>
        <Button className={styles.gifts_filters_button}>Бесплатные (2)</Button>
      </div>
      <Card className={styles.gifts_card}>
        <h2 className={styles.gifts_card_title}>Ежедневный розыгрыш</h2>
        <p className={styles.gifts_card_description}>
          Условия:{' '}
          <span className={styles.gifts_card_description_value}>
            <span className={styles.gifts_card_description_value_icon}>
              <TonIcon />
            </span>
            10 000
          </span>{' '}
          за все время
        </p>
        <div className={styles.gifts_card_description_items}>
          <div className={styles.gifts_card_description_item}>
            <h4 className={styles.gifts_card_description_title}>Durov’s Cap (Random)</h4>
            <span className={styles.gifts_card_description_value}>
              <span className={styles.gifts_card_description_value_icon}>
                <TonIcon />
              </span>
              10 000
            </span>
          </div>
          <div className={styles.gifts_card_image_container}>
            <svg
              className={styles.gifts_card_image_container_icon}
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M78.0124 62.0125C80.1822 64.1822 80.1998 67.7293 77.794 69.6339C74.3212 72.3833 70.4774 74.6444 66.3687 76.3462C60.5451 78.7584 54.3034 80 47.9999 80C41.6965 80 35.4547 78.7584 29.6311 76.3462C23.8075 73.934 18.516 70.3983 14.0588 65.9411C9.60157 61.4839 6.06592 56.1924 3.65371 50.3687C1.24149 44.5451 -6.08764e-05 38.3034 -4.4692e-05 31.9999C-3.39025e-05 25.6965 1.24154 19.4547 3.65378 13.6311C5.35566 9.52242 7.61672 5.67864 10.3661 2.20584C12.2707 -0.199981 15.8178 -0.182286 17.9876 1.98747C20.1573 4.15722 20.1173 7.65456 18.2977 10.1253C16.5344 12.5196 15.063 15.1238 13.9199 17.8835C12.0661 22.3589 11.1119 27.1557 11.1119 31.9999C11.1119 36.8441 12.066 41.6409 13.9198 46.1164C15.7736 50.5918 18.4908 54.6584 21.9161 58.0837C25.3415 61.5091 29.408 64.2263 33.8835 66.0801C38.3589 67.9339 43.1557 68.888 47.9999 68.888C52.8441 68.888 57.6409 67.9339 62.1164 66.0801C64.8761 64.937 67.4803 63.4656 69.8746 61.7023C72.3453 59.8827 75.8427 59.8427 78.0124 62.0125Z"
                fill="url(#paint0_linear_156_1788)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_156_1788"
                  x1="81.9411"
                  y1="65.9411"
                  x2="14.0588"
                  y2="-1.94112"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F200FF" />
                  <stop offset="1" stopColor="#910099" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <img className={styles.gifts_card_image_container_image} src={Gift} alt="Gift" />
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.gifts_card_image_container_icon}>
              <path
                d="M1.98759 17.9875C-0.182152 15.8178 -0.199832 12.2707 2.20599 10.3661C5.6788 7.6167 9.52259 5.35564 13.6313 3.65378C19.4549 1.24155 25.6966 -1.05443e-06 32.0001 2.31732e-06C38.3035 5.68907e-06 44.5453 1.24157 50.3689 3.6538C56.1925 6.06603 61.484 9.6017 65.9412 14.0589C70.3984 18.5161 73.9341 23.8076 76.3463 29.6313C78.7585 35.4549 80.0001 41.6966 80 48.0001C80 54.3035 78.7585 60.5453 76.3462 66.3689C74.6443 70.4776 72.3833 74.3214 69.6339 77.7942C67.7293 80.2 64.1822 80.1823 62.0124 78.0125C59.8427 75.8428 59.8827 72.3454 61.7023 69.8747C63.4656 67.4804 64.937 64.8762 66.0801 62.1165C67.9339 57.6411 68.8881 52.8443 68.8881 48.0001C68.8881 43.1559 67.934 38.3591 66.0802 33.8836C64.2264 29.4082 61.5092 25.3416 58.0839 21.9163C54.6585 18.4909 50.592 15.7737 46.1165 13.9199C41.6411 12.0661 36.8443 11.112 32.0001 11.112C27.1559 11.112 22.3591 12.0661 17.8836 13.9199C15.1239 15.063 12.5197 16.5344 10.1254 18.2977C7.65469 20.1173 4.15734 20.1573 1.98759 17.9875Z"
                fill="url(#paint0_linear_156_1787)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_156_1787"
                  x1="-1.94108"
                  y1="14.0589"
                  x2="65.9412"
                  y2="81.9411"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F200FF" />
                  <stop offset="1" stopColor="#910099" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className={styles.gifts_card_description_footer}>
          <div className={styles.gifts_card_description_footer_item}>0д.</div>
          <div
            className={`${styles.gifts_card_description_footer_item} ${styles.gifts_card_description_footer_item_time__container}`}>
            <div className={styles.gifts_card_description_footer_item_time}>19 : 08 : 48</div>
            <div className={styles.gifts_card_description_footer_item_time_text}>
              <span>час.</span>
              <span>мин.</span>
              <span>сек.</span>
            </div>
          </div>
          <div className={styles.gifts_card_description_people}>
            <div className={styles.gifts_card_description_people_item}>
              <PeopleIcon />
              <span>1279</span>
            </div>
            <span>Участников</span>
          </div>
        </div>
        <div className={styles.gifts_card_description_footer_buttons}>
          <Button>Принять участие</Button>
          <Button>
            <TrophiesIcon />
            <span>Предыдущие победители</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
