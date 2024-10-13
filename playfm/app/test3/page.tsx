"use client";

import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";

const content = [
  {
    title: "Kanban Board",
    description: (
      <>
        <p>
          The Kanban board in ManagePro provides an intuitive, visual way to
          manage tasks.
        </p>
        <p>
          By organizing tasks into customizable pipelines, you can easily track
          the progress of projects from start to finish.
        </p>
        <p>
          With features like drag-and-drop functionality and customizable
          columns, this tool enables teams to prioritize tasks, collaborate
          effectively, and stay organized, ultimately improving productivity and
          project delivery.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="https://i.postimg.cc/Jhzg53W0/kanban.png"
          fill
          className="h-full w-full object-fit rounded-md border"
          alt="Feature"
        />
      </div>
    ),
  },
  {
    title: "Timeline",
    description: (
      <>
        <p>
          The timeline provides a bird&apos;s-eye view of tasks and events, allowing
          users to see the entire project&apos;s flow at a glance, making long-term
          planning more manageable.
        </p>
        <p>
          With its intuitive interface and robust features, usersEasily adjust
          task durations and dependencies with drag-and-drop functionality,
          enabling quick updates as priorities shift.
        </p>
        <p>
          Additionally, resource management becomes more efficient as users can
          monitor workload distribution across different stages, ensuring that
          responsibilities are clear and resources are optimized across various
          tasks.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full rounded-md flex items-center justify-center text-white">
        <Image
          src="https://i.postimg.cc/76CWpxhy/timeline.png"
          fill
          className="h-full w-full object-fit rounded-md border"
          alt="Feature"
        />
      </div>
    ),
  },
  {
    title: "Transaction Management",
    description: (
      <>
        <p>
          The transaction management feature in ManagePro simplifies the
          tracking of income and expenses, allowing users to input transactions
          in a centralized system. This organized approach ensures that all
          financial activities are easily accessible, making it straightforward
          to manage day-to-day finances.
        </p>
        <p>
          A key aspect of this feature is the ability to categorize
          transactions. Users can create custom categories to differentiate
          between various income and expense types, such as sales revenue or
          operational costs. This organization helps quickly identify spending
          patterns and enhances financial analysis.
        </p>
        <p>
          Additionally, the transaction management system provides valuable
          insights into cash flow. With categorized transactions, users can
          generate reports that reveal important financial data, facilitating
          better budgeting and informed decision-making. This feature empowers
          users to maintain financial health and plan effectively for the
          future.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full rounded-md flex items-center justify-center text-white">
        <Image
          src="https://i.postimg.cc/vm2Kq1Qz/transaction.png"
          fill
          className="h-full w-full object-fit rounded-md border"
          alt="Feature"
        />
      </div>
    ),
  },
  {
    title: "Calendar",
    description: (
      <>
        <p>
          The event management feature in ManagePro, represented by the
          interactive Big Calendar, enhances user experience by allowing
          seamless interaction with the calendar itself.
        </p>
        <p>
          Users can create new events simply by dragging and dropping on the
          calendar, making event scheduling intuitive and efficient. This
          functionality enables quick adjustments and promotes better
          organization of events.
        </p>
        <p>
          An essential aspect of the Big Calendar is its event tagging system.
          Users can manage event tags effectively, creating custom tags to
          categorize events based on different criteria.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full rounded-md flex items-center justify-center text-white">
        <Image
          src="https://i.postimg.cc/hPVHDPrD/calendar.png"
          fill
          className="h-full w-full object-fit rounded-md border"
          alt="Feature"
        />
      </div>
    ),
  },
  {
    title: "Dashboard",
    description: (
      <>
        <p>
          The dashboard in ManagePro serves as a central hub for users,
          providing a comprehensive overview of project and financial metrics in
          a visually engaging format.
        </p>
        <p>
          It consolidates key data points into easily digestible widgets,
          allowing users to monitor progress at a glance.
        </p>
        <p>
          This centralized access helps users quickly identify areas that need
          attention or improvement, enhancing decision-making and strategic
          planning.
        </p>
      </>
    ),
    content: (
      <div className="h-full w-full rounded-md flex items-center justify-center text-white">
        <Image
          src="https://i.postimg.cc/JzmSGV6b/dashboard.png"
          fill
          className="h-full w-full object-fit rounded-md border"
          alt="Feature"
        />
      </div>
    ),
  },
];

const Test3 = ({
  contentClassName,
}: {
  contentClassName?: string | React.ReactNode;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="flex justify-center relative space-x-10 rounded-md p-10 pb-0 bg-black"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-5xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="mb-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="max-w-md mt-4 space-y-2"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        className="hidden lg:block max-w-2xl h-[358px] rounded-md w-full sticky top-10"
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};

export default Test3
