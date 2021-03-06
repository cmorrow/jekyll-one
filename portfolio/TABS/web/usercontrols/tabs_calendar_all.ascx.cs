using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace TABS_UserControls.usercontrols
{
    public partial class tabs_calendar_all : System.Web.UI.UserControl
    {
        private TABS_UserControls.resources.code.BAL.EventClass eventlogic = new TABS_UserControls.resources.code.BAL.EventClass();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack) {
                repeatCalendar.DataSource = eventlogic.getAllTabsCurrentEvents();
                repeatCalendar.DataBind();
            }

            this.Page.Title = "The TABS Calendar of Events - The Association of Boarding Schools - TABS";

        }
    }
}