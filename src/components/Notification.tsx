import React, { useState } from "react";
import Image from "next/image";

export type NotificationType =
  | "reaction"
  | "follow"
  | "groupJoin"
  | "pm"
  | "pictureComment"
  | "groupLeave";

export interface NotificationProps {
  id: number;
  type: NotificationType;
  name: string;
  avatarUrl: string;
  message: string;
  postName?: string;
  time: string;
  groupName?: string;
  pmContent?: string;
  pictureUrl?: string;
  isRead: boolean;
  toggleRead: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  name,
  avatarUrl,
  message,
  postName,
  time,
  groupName,
  pmContent,
  pictureUrl,
  isRead,
  toggleRead,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Styling
  const generalStyling = `flex w-full items-center space-x-4 p-4 rounded-lg ${!isRead ? "bg-very-light-grayish-blue" : "bg-white"}`;
  const avatarStyling = `h-10 w-10 rounded-full self-start`;
  const contentContainerStyling = `flex w-full items-start justify-between`;
  const nameStyling = `mr-1 hover:text-blue cursor-pointer font-bold text-very-dark-blue hover:underline`;
  const staticTextStyling = `ml-1 text-sm mr-3 text-dark-grayish-blue`;
  const linkStyling = `ml-1 mr-3 text-sm hover:font-bold hover:text-blue hover:underline cursor-pointer items-center font-semibold text-grayish-blue`;
  const timeStyling = `text-grayish-blue/50 text-sm mt-1`;
  const unreadStyling = `self-start`;

  switch (type) {
    case "reaction":
      return (
        <div className={`${generalStyling}`} onClick={() => toggleRead()}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              width={40}
              height={40}
              alt="avatar"
              className={`${avatarStyling}`}
            />
          )}
          <div className={`${contentContainerStyling}`}>
            <div className="flex flex-col">
              <p className={`${staticTextStyling}`}>
                <span className={`${nameStyling}`}>{name}</span>
                reacted to your post
                <span className={`${linkStyling}`}>{postName}</span>
              </p>
              <p className={`${timeStyling}`}>{time} ago</p>
            </div>
            {!isRead && <div className={`${unreadStyling}`}>🔴</div>}
          </div>
        </div>
      );
    case "follow":
      return (
        <div className={`${generalStyling}`} onClick={() => toggleRead()}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              width={40}
              height={40}
              alt="avatar"
              className={`${avatarStyling}`}
            />
          )}
          <div className={`${contentContainerStyling}`}>
            <div className="flex flex-col">
              <p>
                <span className={`${nameStyling}`}>{name}</span>
                <span className={`${staticTextStyling}`}>followed you</span>
              </p>
              <p className={`${timeStyling}`}>{time} ago</p>
            </div>
            {!isRead && <div className={`${unreadStyling}`}>🔴</div>}
          </div>
        </div>
      );
    case "groupJoin":
      return (
        <div className={`${generalStyling}`} onClick={() => toggleRead()}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              width={40}
              height={40}
              alt="avatar"
              className={`${avatarStyling}`}
            />
          )}
          <div className={`${contentContainerStyling}`}>
            <div className="flex flex-col">
              <p>
                <span className={`${nameStyling}`}>{name}</span>
                <span className={`${staticTextStyling} mr-0`}>
                  has joined your group
                </span>
                <span className={`${linkStyling}`}>{groupName}</span>
              </p>
              <p className={`${timeStyling}`}>{time} ago</p>
            </div>
            {!isRead && <span>🔴</span>}
          </div>
        </div>
      );
    case "pm":
      return (
        <div className={`${generalStyling}`} onClick={() => toggleRead()}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              width={40}
              height={40}
              alt="avatar"
              className={`${avatarStyling}`}
            />
          )}
          <div className={`${contentContainerStyling}`}>
            <div className="flex flex-col">
              <p>
                <span className={`${nameStyling}`}>{name}</span>
                <span className={`${staticTextStyling} mr-0`}>
                  sent you a private message
                </span>
              </p>
              <p className={`${timeStyling}`}>{time} ago</p>
              <div className="border-grayish-blue1 mt-2 rounded-md border-2 p-4 hover:bg-light-grayish-blue2">
                <p
                  className={`cursor-default text-sm ${isExpanded ? "" : "line-clamp-1"}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleExpanded();
                  }}
                >
                  {pmContent}
                </p>
              </div>
            </div>
            {!isRead && <span>🔴</span>}
          </div>
        </div>
      );
    case "pictureComment":
      return (
        <div className={`${generalStyling}`} onClick={() => toggleRead()}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              width={40}
              height={40}
              alt="avatar"
              className={`${avatarStyling}`}
            />
          )}
          <div className={`${contentContainerStyling}`}>
            <div className="flex flex-col">
              <p>
                <span className={`${nameStyling}`}>{name}</span>
                <span className={`${staticTextStyling} mr-0`}>
                  commented on your picture
                </span>
              </p>
              <p className={`${timeStyling}`}>{time} ago</p>
            </div>
            {pictureUrl && (
              <Image
                src={pictureUrl}
                width={40}
                height={40}
                alt="Picture that was commented on"
                className="mr-2"
              />
            )}
          </div>
          {!isRead && <span className="self-start">🔴</span>}
        </div>
      );
    case "groupLeave":
      return (
        <div className={`${generalStyling}`} onClick={() => toggleRead()}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              width={40}
              height={40}
              alt="avatar"
              className={`${avatarStyling}`}
            />
          )}
          <div className={`${contentContainerStyling}`}>
            <div className="flex flex-col">
              <p>
                <span className={`${nameStyling}`}>{name}</span>
                <span className={`${staticTextStyling} mr-0`}>
                  has left the group
                </span>
                <span className={`${linkStyling}`}>{groupName}</span>
              </p>
              <p className={`${timeStyling}`}>{time} ago</p>
            </div>
            {!isRead && <span>🔴</span>}
          </div>
        </div>
      );
    default:
      return (
        <div className={`${generalStyling}`} onClick={() => toggleRead()}>
          {message}
        </div>
      );
  }
};

export default Notification;
