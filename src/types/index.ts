export interface Student {
  id: string;
  name: string;
  rollNo: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface DailyAttendance {
  studentId: string;
  status: AttendanceStatus;
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  records: DailyAttendance[];
}
