export type NotificationContext = "system" | "workspace" | "account" | "feature";

export type NotificationLevel = "info" | "success" | "warning" | "danger";

export type NotificationInput = {
    actionHref?: string;
    actionLabel?: string;
    context: NotificationContext;
    id?: string;
    level?: NotificationLevel;
    message: string;
    read?: boolean;
    title: string;
};

export type AppNotification = Required<Pick<NotificationInput, "context" | "level" | "message" | "read" | "title">> &
    Pick<NotificationInput, "actionHref" | "actionLabel"> & {
        id: string;
    };

export class NotificationBuilder {
    static create(input: NotificationInput): AppNotification {
        return {
            context: input.context,
            id: input.id ?? `${input.context}-${Date.now()}`,
            level: input.level ?? "info",
            message: input.message,
            read: input.read ?? false,
            title: input.title,
            ...(input.actionHref ? { actionHref: input.actionHref } : {}),
            ...(input.actionLabel ? { actionLabel: input.actionLabel } : {}),
        };
    }

    static createMany(inputs: NotificationInput[]): AppNotification[] {
        return inputs.map((input) => this.create(input));
    }

    static unreadCount(notifications: AppNotification[]): number {
        return notifications.filter((notification) => !notification.read).length;
    }
}
