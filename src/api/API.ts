import * as Auth from './auth';
import * as Companies from './companies';
import * as Users from './users';
import * as Students from './students';
import * as SSApplications from './sSApplications';
import * as S3bucket from './s3bucket'

export class API {
  static auth = Auth
  static companies = Companies
  static users = Users
  static students = Students
  static sSApplications = SSApplications
  static s3bucket = S3bucket
}
