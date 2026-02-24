import styles from './DetailField.module.css';

interface DetailFieldProps {
  label: string;
  value: string | number | string[] | null | undefined;
}

export function DetailField({ label, value }: DetailFieldProps) {
  const displayValue = Array.isArray(value)
    ? value.length > 0
      ? `${value.length} entries`
      : 'None'
    : value ?? 'Unknown';

  return (
    <div className={styles.field}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{displayValue}</dd>
    </div>
  );
}
