export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  email: string;
  password: string;
  name: string;
}

export interface IUpdateInfo {
  name: string;
  title: string;
  desc: string;
  avaterUrl: string;
}
export interface IChannels {
  _id: string;
  name: string;
  isOnline: boolean;
  title: string;
  desc: string;
  avaterUrl: string;
}
export interface ISingleChannel {
  _id: string;
  name: string;
  isOnline: boolean;
  title: string;
  desc: string;
  email: string;
  streamUrl: string;
  onlineViewer: string;
}

