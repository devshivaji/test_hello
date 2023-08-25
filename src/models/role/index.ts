import { mongoClient } from "../../configs/mongodb";
import { MongoDBModel } from "../../utils/mongodb";

type Groupcategory = {
  basic: {
    create: Boolean;
    read: Boolean;
    update: Boolean;
    delete: Boolean;
  };
  administrative: {
    readAll: Boolean;
    updateAll: Boolean;
    deleteAll: Boolean;
  };
  special: {
    note: Boolean;
    task: Boolean;
    maeeting: Boolean;
    email: Boolean;
    call: Boolean;
    message: Boolean;
    quotation: Boolean;
    document: Boolean;
  };
};

type Automation = Groupcategory & {
  workflows: Groupcategory;
};

type CommunicationManagement = Groupcategory & {
  call: Groupcategory;
  email: Groupcategory;
  emailTemplate: Groupcategory;
  message: Groupcategory;
};
type CompanyManagement = Groupcategory & {
  company: Groupcategory;
};

type Configuration = Groupcategory & {
  configuration: Groupcategory;
  conversionMapping: Groupcategory;
  costomFeild: Groupcategory;
  dataSharing: Groupcategory;
  layout: Groupcategory;
  pipeline: Groupcategory;
  productandService: Groupcategory;
  profile: Groupcategory;
  smartList: Groupcategory;
};
type ContactManagement = Groupcategory & {
  contact: Groupcategory;
};
type DataManagement = Groupcategory & {
  export: Groupcategory;
};
type DealManagement = Groupcategory & {
  deal: Groupcategory;
};
type GoalsManagement = Groupcategory & {
  goal: Groupcategory;
  integrations: Groupcategory;
  leadCaptureForm: Groupcategory;
  webhooks: Groupcategory;
};
type LeadManagement = Groupcategory & {
  lead: Groupcategory;
};
type OrderManagement = Groupcategory & {
  quotation: Groupcategory;
};
type ProductivityManagement = Groupcategory & {
  document: Groupcategory;
  meeting: Groupcategory;
  note: Groupcategory;
  task: Groupcategory;
};
type ReportManagement = Groupcategory & {
  dashboard: Groupcategory;
  report: Groupcategory;
};
type UserManagement = Groupcategory & {
  dashboard: Groupcategory;
  report: Groupcategory;
};
export default class Role extends MongoDBModel {
  constructor(
    public roleName: string,
    public description?: string,
    public productAccess?: Boolean,
    public modulePermissions?: {
      all?: Groupcategory;
      automation?: Automation;
      communicationManagement?: CommunicationManagement;
      companyManagement?: CompanyManagement;
      configuration?: Configuration;
      contactManagement?: ContactManagement;
      dataManagement?: DataManagement;
      dealManagement?: DealManagement;
      goalsManagement?: GoalsManagement;
      leadManagement?: LeadManagement;
      orderManagement?: OrderManagement;
      productivityManagement?: ProductivityManagement;
      reportManagement?: ReportManagement;
      userManagement?: UserManagement;
    }
  ) {
    super();
  }
  static getModel(dbName: string) {
    return mongoClient.db(dbName).collection<Role>("role");
  }
}
