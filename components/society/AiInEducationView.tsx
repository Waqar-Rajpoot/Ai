import Link from "next/link";
import {
  AGE_RULES_NOTE,
  AGE_RULE_ROWS,
  AI_IN_EDUCATION_LAST_REVIEWED,
  AI_IN_EDUCATION_TITLE,
  COPY_READY_PROMPTS,
  DETECTOR_EVIDENCE,
  DISCLOSURE_TEMPLATE,
  EDUCATION_RELATED_LINKS,
  EDUCATION_SOURCES,
  EU_ACT_ITEMS,
  EU_ACT_NOTE,
  FAQ_ITEMS,
  IN_SHORT,
  KEY_NUMBERS,
  LEADER_CHECKLIST,
  LEARNING_EVIDENCE,
  LEARN_VS_SHORTCUT_ROWS,
  LEARN_VS_SHORTCUT_TEST,
  LIMITS_TEXT,
  MYTH_ROWS,
  PAGE_SECTIONS,
  PARENT_SECTION,
  POLICY_LEVELS,
  POLICY_LEVELS_NOTE,
  PRIVACY_BASICS,
  SOURCES_VERIFIED_ON,
  STUDENT_ROUTINE,
  TEACHER_SECTION,
  THIS_WEEK,
  USAGE_RULES_NOTE,
  USAGE_TABLES,
  WHAT_CAN_GO_WRONG,
} from "@/lib/society/aiInEducation";
import ArticleSection from "./ArticleSection";
import DataTable from "./DataTable";
import SourceCitation from "./SourceCitation";
import styles from "./AiInEducationView.module.css";

/** Renders the "AI in education" guide. All text and data come from `lib/society/aiInEducation`. */
export default function AiInEducationView() {
  return (
    <article className={styles.article}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/">Home</Link> / <Link href="/society">AI &amp; Society</Link> / AI in education
      </nav>

      <header>
        <h1>{AI_IN_EDUCATION_TITLE}</h1>
        <p className={styles.meta}>
          By AI Tools for Everyday People editorial team. Last reviewed {AI_IN_EDUCATION_LAST_REVIEWED}. Audience: students,
          parents, teachers and school leaders.
        </p>
      </header>

      <nav aria-label="On this page" className={styles.toc}>
        <h2 className={styles.tocHeading}>On this page</h2>
        <ul>
          {PAGE_SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <ArticleSection id="in-short" heading="In short">
        <ul>
          {IN_SHORT.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection id="key-numbers" heading="Key numbers">
        <p>Every figure names its survey, group and year. Surveys measure different groups, so do not compare them directly.</p>
        <div className={styles.statGrid}>
          {KEY_NUMBERS.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statDetail}>
                {stat.detail}
                <SourceCitation sourceIds={stat.sourceIds} />
              </p>
            </div>
          ))}
        </div>
      </ArticleSection>

      <ArticleSection id="how-it-is-used" heading="How students and teachers use AI">
        {USAGE_TABLES.map((table) => (
          <div key={table.id} className={styles.block}>
            <h3>
              {table.title}
              <SourceCitation sourceIds={table.sourceIds} />
            </h3>
            <DataTable
              caption={table.title}
              columns={[table.activityHeading, table.shareHeading]}
              rows={table.rows.map((row) => [row.activity, row.share])}
            />
            <p className={styles.note}>{table.note}</p>
          </div>
        ))}
        <p>
          {USAGE_RULES_NOTE.text}
          <SourceCitation sourceIds={USAGE_RULES_NOTE.sourceIds} />
        </p>
        <p>
          Teachers use AI differently. They report using it mostly for planning lessons, making worksheets, adapting
          materials and administrative tasks, which is why the time-saving claims are a big part of the story below.
        </p>
      </ArticleSection>

      <ArticleSection id="learning-evidence" heading="What the research says about learning">
        <p>
          {LEARNING_EVIDENCE.intro}
          <SourceCitation sourceIds={LEARNING_EVIDENCE.rowsSourceIds} />
        </p>
        <DataTable
          caption="Results of the high school maths trial"
          columns={LEARNING_EVIDENCE.columns}
          rows={LEARNING_EVIDENCE.rows}
        />
        <h3>What to take from it</h3>
        <ul>
          {LEARNING_EVIDENCE.takeaways.map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
        <div className={styles.callout}>
          <h3>Limits of the evidence</h3>
          <ul>
            {LEARNING_EVIDENCE.caveats.map((caveat) => (
              <li key={caveat}>{caveat}</li>
            ))}
          </ul>
        </div>
      </ArticleSection>

      <ArticleSection id="learn-or-shortcut" heading="Learning or shortcut?">
        <p>The same tool can do either. The difference is who does the thinking.</p>
        <DataTable
          caption="Ways of using AI that build learning compared with shortcuts"
          columns={["Builds learning", "Skips the learning"]}
          rows={LEARN_VS_SHORTCUT_ROWS.map((row) => [row.learning, row.shortcut])}
        />
        <p className={styles.note}>{LEARN_VS_SHORTCUT_TEST}</p>

        <h3>A simple three-level rule for assignments</h3>
        <div className={styles.levels}>
          {POLICY_LEVELS.map((level) => (
            <div key={level.tone} className={`${styles.level} ${styles[level.tone]}`}>
              <h4>{level.label}</h4>
              <p>{level.meaning}</p>
              <ul>
                {level.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.note}>{POLICY_LEVELS_NOTE}</p>
      </ArticleSection>

      <ArticleSection id="for-students" heading="For students: a routine that keeps you learning">
        <ol className={styles.steps}>
          {STUDENT_ROUTINE.map((step) => (
            <li key={step.title}>
              <strong>{step.title}.</strong> {step.description}
            </li>
          ))}
        </ol>
        <h3>Disclosure line you can copy</h3>
        <pre className={styles.prompt}>{DISCLOSURE_TEMPLATE}</pre>
      </ArticleSection>

      <ArticleSection id="for-parents" heading="For parents">
        <p>{PARENT_SECTION.intro}</p>
        <div className={styles.columns}>
          <div className={styles.block}>
            <h3>Questions to ask the school</h3>
            <ul>
              {PARENT_SECTION.schoolQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
          <div className={styles.block}>
            <h3>Rules for home</h3>
            <ul>
              {PARENT_SECTION.homeRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
        <h3>Conversation starters</h3>
        <ul>
          {PARENT_SECTION.talkStarters.map((starter) => (
            <li key={starter}>{starter}</li>
          ))}
        </ul>
        <h3>Reasons to talk, not to punish</h3>
        <ul>
          {PARENT_SECTION.signsToTalk.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
        <p className={styles.note}>{PARENT_SECTION.signsNote}</p>
        <div className={styles.callout}>
          <h3>Emotional support and loneliness</h3>
          <p>
            {PARENT_SECTION.wellbeingNote}
            <SourceCitation sourceIds={PARENT_SECTION.wellbeingSourceIds} />
          </p>
        </div>
      </ArticleSection>

      <ArticleSection id="for-teachers" heading="For teachers">
        <p>{TEACHER_SECTION.intro}</p>
        <div className={styles.columns}>
          <div className={styles.block}>
            <h3>Design tasks that show thinking</h3>
            <ul>
              {TEACHER_SECTION.designIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </div>
          <div className={styles.block}>
            <h3>Keep these human</h3>
            <ul>
              {TEACHER_SECTION.keepHuman.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>Student data rules</h3>
            <ul>
              {TEACHER_SECTION.privacyRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
        <h3>How much time does it really save?</h3>
        <p>
          {TEACHER_SECTION.timeNote.text}
          <SourceCitation sourceIds={TEACHER_SECTION.timeNote.sourceIds} />
        </p>
      </ArticleSection>

      <ArticleSection id="detectors" heading="AI detectors: why a score is not proof">
        <p>{DETECTOR_EVIDENCE.intro}</p>
        <ul>
          {DETECTOR_EVIDENCE.facts.map((fact) => (
            <li key={fact.text}>
              {fact.text}
              <SourceCitation sourceIds={fact.sourceIds} />
            </li>
          ))}
        </ul>
        <h3>What to do instead</h3>
        <ul>
          {DETECTOR_EVIDENCE.advice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection id="for-leaders" heading="For school leaders and administrators">
        <h3>Policy checklist</h3>
        <ul>
          {LEADER_CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3>If you work in or with the EU: the AI Act</h3>
        <ul>
          {EU_ACT_ITEMS.map((item) => (
            <li key={item.date}>
              <strong>{item.date}.</strong> {item.text}
              <SourceCitation sourceIds={item.sourceIds} />
            </li>
          ))}
        </ul>
        <p className={styles.note}>
          {EU_ACT_NOTE} See also our <Link href="/news/eu-ai-act">EU AI Act timeline</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="age-and-privacy" heading="Age limits and privacy">
        <DataTable
          caption="Minimum age rules for common AI chatbots"
          columns={["Service", "Minimum age", "Notes"]}
          rows={AGE_RULE_ROWS.map((row) => [row.service, row.minimumAge, row.notes])}
        />
        <p className={styles.note}>
          Sources:{" "}
          <SourceCitation sourceIds={[...new Set(AGE_RULE_ROWS.flatMap((row) => row.sourceIds))]} /> Verified on{" "}
          {SOURCES_VERIFIED_ON}. {AGE_RULES_NOTE}
        </p>
        <h3>Privacy basics</h3>
        <ul>
          {PRIVACY_BASICS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection id="prompts" heading="Copy-ready prompts">
        <p>
          Replace the [brackets] with general details. Never include a child&apos;s name, school or other personal
          information.
        </p>
        {COPY_READY_PROMPTS.map((prompt) => (
          <div key={prompt.id} className={styles.block}>
            <h3>
              {prompt.title} <span className={styles.badge}>{prompt.audience}</span>
            </h3>
            <p className={styles.note}>{prompt.when}</p>
            <pre className={styles.prompt}>{prompt.text}</pre>
          </div>
        ))}
      </ArticleSection>

      <ArticleSection id="myths" heading="Myths and facts">
        <DataTable
          caption="Common myths about AI in education and what the evidence says"
          columns={["Myth", "What the evidence says"]}
          rows={MYTH_ROWS.map((row) => [row.myth, row.fact])}
        />
        <p className={styles.note}>
          Sources: <SourceCitation sourceIds={[...new Set(MYTH_ROWS.flatMap((row) => row.sourceIds))]} />
        </p>
      </ArticleSection>

      <ArticleSection id="faq" heading="Common questions">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className={styles.faqItem}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </ArticleSection>

      <ArticleSection id="this-week" heading="Do this week">
        <div className={styles.columns}>
          {THIS_WEEK.map((group) => (
            <div key={group.audience} className={styles.block}>
              <h3>{group.audience}</h3>
              <ul>
                {group.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ArticleSection>

      <section>
        <h2>What can go wrong</h2>
        <ul>
          {WHAT_CAN_GO_WRONG.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Limits of this guide</h2>
        <p>{LIMITS_TEXT}</p>
      </section>

      <ArticleSection id="sources" heading="Sources and labels">
        <p>All sources opened and checked on {SOURCES_VERIFIED_ON}. The label shows what kind of source each is.</p>
        <ol className={styles.sources}>
          {EDUCATION_SOURCES.map((source) => (
            <li key={source.id} id={`source-${source.id}`}>
              {source.label}. <a href={source.url}>{source.title}</a>
            </li>
          ))}
        </ol>
      </ArticleSection>

      <section>
        <h2>Related</h2>
        <ul>
          {EDUCATION_RELATED_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}