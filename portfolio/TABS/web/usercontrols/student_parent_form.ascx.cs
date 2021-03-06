using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;

using TABS_UserControls.resources.code.BAL;

namespace TABS_UserControls.usercontrols
{
      public partial class student_parent_form : System.Web.UI.UserControl
      {
            private TABS_UserControls.resources.code.BAL.SpecificFairClass specificFair = new TABS_UserControls.resources.code.BAL.SpecificFairClass();
            private TABS_UserControls.resources.code.BAL.FairForm fairForm = new TABS_UserControls.resources.code.BAL.FairForm();
            string fairId;
            int languageId;
            protected void Page_Load(object sender, EventArgs e)
            {
                  if (!IsPostBack)
                  {
                        if ((Session["FairId"] != null) && (!string.IsNullOrEmpty(Session["FairId"].ToString())))
                        {
                              fairId = Session["FairId"].ToString();
                              DataTable dt = specificFair.GetSpecificFairById(Convert.ToInt16(fairId));
                              if (dt.Rows.Count > 0)
                              {
                                    string city = dt.Rows[0]["city"].ToString();
                                    string year = dt.Rows[0]["year"].ToString();
                                    languageId = Convert.ToInt16( dt.Rows[0]["languageId"].ToString());
                                    DataTable dtEnglish = specificFair.GetSpecificFairByCityYearLanguage(city, year, 1);
                                    if (dtEnglish.Rows.Count > 0)
                                    {
                                          fairId = dtEnglish.Rows[0]["id"].ToString();
                                          Session["FairId"] = fairId;
                                          lbCityCountry.Text = dtEnglish.Rows[0]["city"].ToString() + ", " + dtEnglish.Rows[0]["country"].ToString();
                                    }
                              }
                        }
                        loadFairsRadioButtons();
                        loadCountriesDropDownList();
                        instructionsTranslation();
                  }
            }

            public void loadCountriesDropDownList()
            {
                  parentDlCountry.DataSource = fairForm.GetAllCountries();
                  parentDlCountry.DataTextField = "country";
                  parentDlCountry.DataValueField = "countryId";
                  parentDlCountry.DataBind();
                  parentDlCountry.Items.Insert(0, new ListItem("select", ""));
                  parentDlState.Items.Insert(0, new ListItem("select country first", ""));
            }
            
            public string returnDate(string date)
            {
                  DateTime bbb = Convert.ToDateTime(date);
                  return bbb.ToString("D");
            }

            public void instructionsTranslation() {

                
                switch (languageId) {
                    case 1: //english

                        break;
                    case 2://ChineseTraditional
                        labLocalInst.Text = "註冊表格必須用英文填寫。如果您不會英語，您可以改在博覽會註冊。在那裡將會有非常樂意協助您的翻譯員。\r\n我們的學校代表人很期待與您會面！";
                        ;
                        break;
                    case 3://Korean
                        labLocalInst.Text = "등록 양식은 영어로 작성되어야 합니다. 영어로 읽고 작성하실 수 없으면, 통역가의 도움을 받을 수 있는 유학박람회에서 등록하실 수도 있습니다. 저희들의 학교 대표자들은 여러분을 만나 뵙기를 고대하고 있습니다!";
                             
                        break;
                    case 4://Thai
                        labLocalInst.Text = "จะต้องกรอกแบบฟอร์มการลงทะเบียนเป็นภาษาอังกฤษ หากท่านไม่สามารถอ่านและเขียนภาษาอังกฤษได้ ท่านอาจจะต้องลงทะเบียนที่งานซึ่งเราจะมีนักแปลคอยช่วยเหลือท่าน \r\nตัวแทนโรงรียนของเรารอคอยที่จะพบกับท่าน!";

                        break;
                    case 5://Hindi
                        labLocalInst.Text = "पंजीयन प्रपत्र अनिवार्य रूप से अंग्रेजी में भरा जाना चाहिए। अगर आप अंग्रेज़ी लिख-पढ़ नहीं सकते तो आप मेले में ही अपना पंजीयन करा सकते हैं जहां अनुवादकों को आपकी मदद करके खुशी होगी। \r\n हमारे स्कूली प्रतिनिधि आपसे मिलने की प्रतीक्षा कर रहे हैं!";
                        break;

                    case 6://Japanese
                        labLocalInst.Text = "登録用紙は、英語で記入されなければなりません。英語を読み書きなさらない方は、フェアー会場にて翻訳・通訳担当者がお手伝いさせていただきます。私たちの学校担当者たちは、みなさまにお目にかかれることを楽しみにしております!";
                        break;
                    case 7://Vietnamese
                        labLocalInst.Text = "Mẫu đăng ký phải được điền bằng tiếng Anh.  Nếu quý vị không biết đọc hoặc viết tiếng Anh, quý vị có thể đăng ký tại hội chợ, ở đó các phiên dịch sẽ rất vui lòng giúp quý vị.\r\nĐại diện trường chúng tôi rất mong được gặp quý vị! ";

                        break;
                    case 8://chineseSimple
                        labLocalInst.Text = "注册表格必须用英文填写。如果您不会英语，您可以改在博览会注册。在那里将会有非常乐意协助您的翻译员。\r\n我们的学校代表人很期待与您会面！";
                        break;
                }
            }

            public void loadFairsRadioButtons()
            {
                  //set default id if none is passed
                  DataTable dt = specificFair.GetActivePublishedFairsInEnglishByYear(DateTime.Now.Year.ToString());
                  if (string.IsNullOrEmpty(fairId))
                  {
                        fairId = dt.Rows[0]["id"].ToString();
                  }
                  List<ListItem> mssks = new List<ListItem>();
                  for (int i = 0; i < dt.Rows.Count; i++)
                  {
                        DateTime theDate = Convert.ToDateTime(dt.Rows[i]["date"]);
                        string strDate = "(" + theDate.ToString("D") + ")";
                        ListItem li = new ListItem();
                        li.Text = dt.Rows[i]["city"].ToString() + ", " + dt.Rows[i]["country"].ToString() + " " + strDate;
                        li.Value = dt.Rows[i]["id"].ToString();
                        mssks.Add(li);
                  }
                  for (int x = 0; x < mssks.Count; x++)
                  {
                        rlFairInformation.Items.Add(mssks[x]);
                  }
                  rlFairInformation.SelectedValue = fairId;
            }

            protected void rlFairInformation_DataBound(object sender, EventArgs e)
            {

            }

            /// <summary>
            /// collects form data and sends to database
            /// </summary>
            /// <param name="sender"></param>
            /// <param name="e"></param>
            protected void btnSubmit_Click(object sender, EventArgs e)
            {
                  buildEmail(); 
                  
            }
   
            public void buildEmail()
            {
                  
                  FairFormParent fairFormParent = new FairFormParent();
                  fairFormParent.Address1 = parentTbAddress1.Text;
                  fairFormParent.Address2 = parentTbAddress2.Text;
                  fairFormParent.City = parentTbCity.Text;
                  fairFormParent.Country = parentDlCountry.SelectedItem.Text;
                  fairFormParent.Email = parentTbEmail.Text;
                  fairFormParent.FairId = Convert.ToInt16(rlFairInformation.SelectedValue);
                  DataTable fairdt = specificFair.GetSpecificFairById(Convert.ToInt16(rlFairInformation.SelectedValue));
                  if (fairdt.Rows.Count > 0)
                  {
                        fairFormParent.ConfirmationNumber = fairdt.Rows[0]["fairCode"].ToString();
                  }
                  else
                  {
                        fairFormParent.ConfirmationNumber = "Err1";
                  }

                  fairFormParent.FamilyName = parentTbFamilyName.Text;
                  fairFormParent.GivenName = parentTbGivenName.Text;
                  fairFormParent.Phone = parentTbPhone.Text;
                  fairFormParent.PostalCode = parentTbZip.Text;
                  if (parentDlState.SelectedValue == "0")
                  {
                        fairFormParent.State = "  ";
                  }
                  else
                  {
                        fairFormParent.State = parentDlState.SelectedValue;
                  }
                  fairFormParent.Title = parentDlTitle.SelectedValue;

                  List<FairFormStudent> students = new List<FairFormStudent>();
                  fairFormParent.FairFormStudent = students;
                  FairFormStudent fairFormStudent = new FairFormStudent();
                  fairFormStudent.Age = ParseStringToInteger(tbAge1.Text);
                  fairFormStudent.FamilyName = tbFamilyName1.Text;
                  fairFormStudent.Gender = rlGender1.SelectedValue;
                  fairFormStudent.GivenName = tbGivenName1.Text;
                  fairFormParent.FairFormStudent.Add(fairFormStudent);
                  if (!string.IsNullOrEmpty(tbGivenName2.Text))
                  {
                        fairFormStudent = new FairFormStudent();
                        fairFormStudent.Age = ParseStringToInteger(tbAge2.Text);
                        fairFormStudent.FamilyName = tbFamilyName2.Text;
                        fairFormStudent.Gender = rlGender2.SelectedValue;
                        fairFormStudent.GivenName = tbGivenName2.Text;
                        fairFormParent.FairFormStudent.Add(fairFormStudent);
                  }
                  if (!string.IsNullOrEmpty(tbGivenName3.Text))
                  {
                        fairFormStudent = new FairFormStudent();
                        fairFormStudent.Age = ParseStringToInteger(tbAge3.Text);
                        fairFormStudent.FamilyName = tbFamilyName3.Text;
                        fairFormStudent.Gender = rlGender3.SelectedValue;
                        fairFormStudent.GivenName = tbGivenName3.Text;
                        fairFormParent.FairFormStudent.Add(fairFormStudent);
                  }
                  FairForm bozo = new FairForm();
                  try
                  {
                        bozo.InsertFormRecord(fairFormParent);
                        SendConfirmEmail(fairFormParent);
                        Session["fairFormParent"] = fairFormParent;
                         Response.Redirect("/find-a-school/explore-your-options/asia-fairs/thank-you.aspx");
                        //Response.Redirect("test2.aspx");
                  }
                  catch (Exception ex)
                  {
                        InfrastructureClass ic1 = new InfrastructureClass();
                        List<string> to = new List<string>();
                        List<string> cc = new List<string>();
                        List<string> bc = new List<string>();
                        to.Add(System.Configuration.ConfigurationManager.AppSettings["ToEmailAddressForErrorReporting"].ToString());
                        string tabsEmail = System.Configuration.ConfigurationManager.AppSettings["TABsEmailAddress"].ToString();
                        ic1.SendEmail(tabsEmail,
                           to,
                           cc, bc,
                          "TABs Website Error Report",
                         ex.Message + " " + ex.StackTrace, true);
                        lbErrMsg.Visible = true;
                  }
                  
            }

            /// <summary>
            /// sends confirmation email
            /// </summary>
            /// <param name="ffp"></param>
            public void SendConfirmEmail(FairFormParent ffp)
            {
                  try
                  {
                        InfrastructureClass ic = new InfrastructureClass();
                        DataTable dt = specificFair.GetSpecificFairById(ffp.FairId);
                        DateTime fairDate = Convert.ToDateTime(dt.Rows[0]["date"]);
                        StringBuilder headingStr = new StringBuilder();
                        headingStr.Append("<p>Dear " + ffp.GivenName.ToString() + " " + ffp.FamilyName.ToString() + ", <br /><br />" +
                              "Hi! Your TABS fair registration has been received! You have been registered for the following event:</p><p>" +
                          "<p> We advise making at least 20 copies of the confirmation letter to leave with each school representative you visit.<br /> " +
                          "Be sure to bring plenty of business cards.</p>");
                        StringBuilder formStr = new StringBuilder();
                        formStr.Append("<h4>Confirmation Number :" + dt.Rows[0]["fairCode"].ToString() + "</h4>");
                        formStr.Append("<h4>Fair Information</h4>" +
                              "<p>" + dt.Rows[0]["city"].ToString() + ", " + dt.Rows[0]["country"].ToString() +
                             " on " + fairDate.ToString("Y") + " from " + dt.Rows[0]["startTime"].ToString() +
                             " to " + dt.Rows[0]["endTime"].ToString() + " registration.</p>");
                        formStr.Append("<h4>Student Information</h4>");
                        int cntr = 1;
                        foreach (FairFormStudent ffs in ffp.FairFormStudent)
                        {
                              formStr.Append(cntr.ToString() + ", " + ffs.FamilyName.ToString() + ", " + ffs.GivenName.ToString() + "<br />");
                              formStr.Append("   " + ffs.Gender.ToString() + ", " + ffs.Age.ToString() + " Years old <br />");
                        }
                        formStr.Append("<h4>Parent Information</h4>" +
                                    ffp.Title.ToString() + " " + ffp.GivenName.ToString() + " " + ffp.FamilyName.ToString() + "<br />" +
                                    ffp.Address1.ToString() + "<br />" +
                                    ffp.Address2.ToString() + "<br />" +
                                    ffp.City.ToString() + ", " + ffp.State.ToString() + ", " + ffp.Country.ToString() + "<br />" +
                                    ffp.PostalCode.ToString() + "<br />" +
                                    ffp.Phone.ToString() + "<br />" +
                                    ffp.Email.ToString());
                        formStr.Append("</p><br /><br /><p>*Attach Bussiness Card Here</p>");
                        StringBuilder footerStr = new StringBuilder();
                        footerStr.Append("<p>TABS is a non-profit organization representing nearly 300 college-prep " +
                              "boarding schools in the U.S., Canada, and abroad. We hope you’ll continue to visit " +
                              "boardingschools.com to learn more about some of the word’s leading schools and to " +
                              "see how they’re preparing young people for college success—and for full and " +
                              "rewarding lives.</p><p>We hope to see you soon on boardingschools.com! Have a " +
                              "great week!</p><p>Thank you,</p><p>The TABS Staff</p>");

                        StringBuilder tabsHeaderStr = new StringBuilder();
                        tabsHeaderStr.Append("<p>Dear TABS,<br /><br />TABS has received a new fair registration. The following registration information was received earlier today:</p>");
                        string tabsFooterStr = "<p>Thank you, <br />The TABS Staff</p>";
                        List<string> to = new List<string>();
                        List<string> cc = new List<string>();
                        List<string> bc = new List<string>();
                        string subject = System.Configuration.ConfigurationManager.AppSettings["emailSubject"].ToString();
                        string from = System.Configuration.ConfigurationManager.AppSettings["fromEmailAddress"].ToString();
                        string body = "";

                        //client email
                        to.Add(ffp.Email.ToString());
                        body = headingStr.ToString() + formStr.ToString() + footerStr.ToString();

                        ReallySendTheEmail(from,to,cc,bc,subject,body,true);
                        
                        //TABs Email
                        to.Clear();
                        to.Add(from);
                        body = tabsHeaderStr.ToString() + formStr.ToString() + tabsFooterStr;
                        ReallySendTheEmail(from,to,cc,bc,subject,body,true);
                  }
                  catch (Exception ex)
                  {
                        InfrastructureClass ic = new InfrastructureClass();
                        List<string> to = new List<string>();
                        List<string> cc = new List<string>();
                        List<string> bc = new List<string>();
                        to.Add(System.Configuration.ConfigurationManager.AppSettings["ToEmailAddressForErrorReporting"].ToString());
                        ic.SendEmail("TabsErrorReport@Tabs.Com",
                           to,
                           cc, bc,
                          "TABs Website Error Report",
                         ex.Message + " " + ex.StackTrace, true);
                        lbErrMsg.Visible = true;
                  }
            }

            private void ReallySendTheEmail(string from, List<string> to, List<string> cc, List<string> bc, string subject, string body, bool isHtml)
            {
                  try
                  {
                        InfrastructureClass ic = new InfrastructureClass();
                        ic.SendEmail(from, to, cc, bc, subject, body, true);
                  }
                  catch (Exception ex)
                  {
                        InfrastructureClass ic = new InfrastructureClass();
                        List<string> to1 = new List<string>();
                        List<string> cc1 = new List<string>();
                        List<string> bc1 = new List<string>();
                        to1.Add(System.Configuration.ConfigurationManager.AppSettings["ToEmailAddressForErrorReporting"].ToString());
                        ic.SendEmail("TabsErrorReport@Tabs.Com",
                           to1,
                           cc1, bc1,
                          "TABs Website Error Report",
                         ex.Message + " " + ex.StackTrace, true);
                        lbErrMsg.Visible = true;
                  }
            }
           
            public int ParseStringToInteger(string toParse)
            {
                  int num2;
                  if (int.TryParse(toParse, out num2))
                  {
                        return num2;
                  }
                  return 0;
            }

            protected void parentDlCountry_SelectedIndexChanged(object sender, EventArgs e)
            {
                  parentDlState.DataSource=fairForm.GetStatesByCountryId(Convert.ToInt16(parentDlCountry.SelectedValue));
                  parentDlState.DataTextField="state";
                  parentDlState.DataValueField="stateId";
                  parentDlState.DataBind();
                  if (parentDlState.Items.Count == 0)
                  {
                        parentDlState.Items.Insert(0, new ListItem("None", "0"));
                  }
                  else
                  {
                        parentDlState.Items.Insert(0, new ListItem("select", ""));
                  }
            }
      }
}