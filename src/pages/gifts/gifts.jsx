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
            <h4 className={styles.gifts_card_description_title}>Durov's Cap (Random)</h4>
            <span className={styles.gifts_card_description_value}>
              <span className={styles.gifts_card_description_value_icon}>
                <TonIcon />
              </span>
              10 000
            </span>
          </div>
          <div className={styles.gifts_card_image_container}>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.gifts_card_image_container_circle}>
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="#F200FF"
                strokeWidth="15"
                strokeLinecap="round"
                strokeOpacity="0.1"
                className={styles.circle_path_bg}
              />
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="url(#gradient1)"
                strokeWidth="15"
                strokeLinecap="round"
                className={styles.circle_path_1}
              />
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="url(#gradient2)"
                strokeWidth="15"
                strokeLinecap="round"
                className={styles.circle_path_2}
              />
              <defs>
                <linearGradient id="gradient1" x1="60" y1="15" x2="60" y2="105" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F200FF" />
                  <stop offset="1" stopColor="#910099" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradient2" x1="60" y1="105" x2="60" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F200FF" />
                  <stop offset="1" stopColor="#910099" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <img className={styles.gifts_card_image_container_image} src={Gift} alt="Gift" />
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
