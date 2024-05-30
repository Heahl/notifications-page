import Head from "next/head";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Notification, {
  type NotificationType,
  NotificationProps,
} from "@/components/Notification";

export default function Home() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [allRead, setAllRead] = useState(false);

  const toggleAllRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, isRead: allRead ? false : true })),
    );
    setAllRead(!allRead);
  };

  const toggleRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n)),
    );
  };

  const totalUnread = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    fetch("/data/notifications.json")
      .then((response) => response.json())
      .then((data: NotificationProps[]) =>
        setNotifications(
          data.map((n) => ({ ...n, isRead: Boolean(n.isRead) })),
        ),
      )
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Head>
        <title>Notifications</title>
        <meta name="description" content="notifications-page" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-start bg-very-light-grayish-blue font-pjsans md:justify-center">
        <div className="flex max-w-[800px] flex-col rounded-xl bg-white px-4 py-6">
          {/* Header */}
          <div className="relative flex h-12 w-full max-w-[800px] items-baseline justify-between bg-white md:relative md:w-full">
            {" "}
            <div className="flex items-end gap-2">
              <h1 className="text-xl font-bold">Notifications</h1>
              <div className="flex h-8 items-center justify-center rounded-lg bg-blue px-4 font-bold text-white">
                {totalUnread}
              </div>
            </div>
            <button
              onClick={toggleAllRead}
              className="py-2 pr-8 text-grayish-blue hover:underline md:pr-0"
            >
              {allRead ? "Mark all as unread" : "Mark all as read"}
            </button>
          </div>
          {/* Notifications */}
          <div className="mt-14 flex flex-col gap-2 md:mt-4">
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                {...notification}
                toggleRead={() => toggleRead(notification.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
