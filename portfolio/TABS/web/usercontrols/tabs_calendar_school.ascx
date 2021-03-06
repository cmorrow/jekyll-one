<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="tabs_calendar_school.ascx.cs" Inherits="TABS_UserControls.usercontrols.tabs_calendar_school" %>

<div class="top10">
    <asp:Repeater ID="repeatCalendar" runat="server">
        <ItemTemplate>
            <p class="top10"><span class="event-time"><%#Eval("startdate") %> to <%#Eval("enddate") %></span></p>
            <h2 class="mar0">
            <a href="/for-schools/professional-development/tabs-calendar-for-schools/tabs-calendar-detail.aspx?section=school&eventid=<%#Eval("eventid") %>"><%#Eval("event") %></a></h2>
            <p><%#Eval("location") %></p>
            <p><%#Eval("shortdescription") %></p>
            <p>Contact: <%#Eval("contact") %>, <%#Eval("address1") %> <%#Eval("Address2") %>, <%#Eval("city") %>, <%#Eval("stateshort") %>, <%#Eval("country") %></p>
        </ItemTemplate>
    </asp:Repeater>
</div>
