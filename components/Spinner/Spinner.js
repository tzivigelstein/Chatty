import styles from './Spinner.module.css'

const Spinner = ({
  width = 24,
  height = 24,
  spinColor = '#eee',
  reverserSpinColor = '#eeeeee77',
}) => {
  return (
    <div className={styles.spinner_container}>
      <div
        style={{ width: width, height: height }}
        className={styles.spinner_container__spinner}
      >
        <span
          style={{ width: width, height: height, borderColor: spinColor }}
          className={styles.spinner_container__00}
        ></span>
        <span
          style={{
            width: width,
            height: height,
            borderColor: reverserSpinColor,
          }}
          className={styles.spinner_container__01}
        ></span>
      </div>
    </div>
  )
}

export default Spinner
