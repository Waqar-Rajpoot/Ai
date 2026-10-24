import type { FreePlanProfile } from "@/lib/prices/freeLimits";
import styles from "./FreePlanDetails.module.css";

interface FreePlanDetailsProps {
  profiles: readonly FreePlanProfile[];
  /** Which part of each profile to show. */
  variant: "includes" | "stops" | "ads";
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** One column per provider, showing what the plan includes, where it stops, or its ad status. */
export function FreePlanDetails({ profiles, variant }: FreePlanDetailsProps) {
  return (
    <div className={styles.grid}>
      {profiles.map((profile) => (
        <section key={profile.id} id={`${variant}-${profile.id}`} className={styles.column}>
          <h3 className={styles.heading}>{profile.product} Free</h3>
          {variant === "includes" && (
            <>
              <BulletList items={profile.includes} />
              <h4 className={styles.subheading}>Not included</h4>
              <BulletList items={profile.notIncluded} />
            </>
          )}
          {variant === "stops" && <BulletList items={profile.stops} />}
          {variant === "ads" && (
            <>
              <p className={styles.adStatus} data-has-ads={profile.ads.hasAds}>
                {profile.ads.headline}
              </p>
              <BulletList items={profile.ads.details} />
            </>
          )}
        </section>
      ))}
    </div>
  );
}

