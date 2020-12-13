export interface botDataTelegram {
  message_id: number;
  from: {
    id: number;
    is_bot: false;
    first_name: string;
    username: string;
    language_code: string;
  };
  chat: {
    id: number;
    first_name: string;
    username: string;
    type: 'private' | 'public';
  };
  date: number;
  text: string;
}
