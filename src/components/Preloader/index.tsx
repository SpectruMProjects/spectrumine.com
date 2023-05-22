import styles from './preloader.module.css'

export default function Preloader() {
  return (
    <div className={styles['body']}>
      <div className={styles['scene']}>
        <div className={styles['cube-wrapper']}>
          <div className={styles['cube']}>
            <div className={styles['cube-faces']}>
              <div
                className={styles['cube-face'] + ' ' + styles['shadow']}
              ></div>
              <div
                className={styles['cube-face'] + ' ' + styles['bottom']}
              ></div>
              <div className={styles['cube-face'] + ' ' + styles['top']}></div>
              <div className={styles['cube-face'] + ' ' + styles['left']}></div>
              <div
                className={styles['cube-face'] + ' ' + styles['right']}
              ></div>
              <div className={styles['cube-face'] + ' ' + styles['back']}></div>
              <div
                className={styles['cube-face'] + ' ' + styles['front']}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
