declare module '@toast-ui/react-calendar' {
  import * as React from "react";

  import tuiCalendar, {
    ISchedule,
    IEvents,
    IOptions
  } from 'tui-calendar';


  type EventNameMapping = {
    onAfterRenderSchedule: "afterRenderSchedule";
    onBeforeCreateSchedule: "beforeCreateSchedule";
    onBeforeDeleteSchedule: "beforeDeleteSchedule";
    onBeforeUpdateSchedule: "beforeUpdateSchedule";
    onClickDayname: "clickDayname";
    onClickMore: "clickMore";
    onClickSchedule: "clickSchedule";
    onClickTimezonesCollapseBtn: "clickTimezonesCollapseBtn";
  };

  type EventMaps = {
    [K in keyof EventNameMapping]?: IEvents[EventNameMapping[K]]
  };

 type Props = IOptions & {
    height: string;
    view?: string;
    schedules?: ISchedule[];
  } & EventMaps;

  export default class Calendar extends React.Component<Props> {
    public getInstance(): typeof tuiCalendar;
    public getRootElement(): HTMLElement;
  }
}
