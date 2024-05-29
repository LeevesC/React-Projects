import styles from './CountryItem.module.css'

function CountryItem({city}) {
  return (
    <div className={styles.countryItem}>
      <span>{city.emoji}</span>
      <span>{city.country}</span>
    </div>
  )
}

export default CountryItem
