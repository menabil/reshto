import { cn } from "@/lib/utils";

export const SectionTitle = ({ eyebrow, title, align = "center", light = false }) => {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={cn("flex flex-col gap-3", alignment, light ? "text-white" : "text-ink dark:text-white")}>
      {eyebrow ? (
        <span className="section-pill">
          <i className="ri-restaurant-2-fill" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink dark:text-white"
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
