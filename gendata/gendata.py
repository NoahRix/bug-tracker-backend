import random
import string
import datetime
import csv

print_sql_flag = True
table_size = 20

bug_types = ("CMP", "RTM", "LGC")

cmp_adjectives = ("undeclared", "unknown", "unused")
cmp_nouns = ("variable", "class", "function" )

rtm_phrases = ("segmentation fault", "stack over flow")

lgc_phrases = ("unnecessary return", "insufficient return path")

variable_names = (
   "ybs_open",
   "wql_open",
   "$Open",
   "ju_OPEN",
   "__Ope",
   "nckOpen",
   "ope",
   "m_open",
   "oen",
   "v_OPE",
   "z_oe",
   "x_ope",
   "OPN"
)

function_names = (
    "execPrint",
    "SubLib",
    "RunLast",
    "InvalidatePointer",
    "exec_jalr",
    "authorizePerson",
    "BUILD_CONSTANT",
    "crashComputer",
    "DeleteSystem32",
    "RecoverSystem32",
    "JkSystem32IsGoneFR"
)

roles = (
    "tester",
    "main fix",
    "log reporter",
    "code cleaner",
    "consultant"
)

usernames = ("noah", "phil", "james", "boss")

bugs = []
bug_assignments = []

class Bug:
    bug_id = ""
    bug_type = ""
    dt_reported = ""
    report_comment = ""
    reportee = ""
   
    def __init__(self, bug_id, bug_type, dt_reported, report_comment, reportee):
        self.bug_id = bug_id
        self.bug_type = bug_type
        self.dt_reported = dt_reported
        self.report_comment = report_comment
        self.reportee = reportee

    def __list__(self):
        return ['lol', 'yes']

    def __str__(self):
        return (
            (
                "{0},{1},{2},{3},{4}" 
            )
            if print_sql_flag else    
            (
                "===============================================================================\n" +
                "bug_id: {0}\nbug_type: {1}\ndt_reported: {2}\nreport_comment: {3}\nreportee: {4}\n" +
                "===============================================================================\n"
            )
        ).format(self.bug_id, self.bug_type, self.dt_reported, self.report_comment, self.reportee)

class BugAssignment:
    assignee = ""
    bug_id = ""
    dt_start = ""
    dt_end = ""
    progress = ""
    role = ""

    def __init__(self, assignee, bug_id, dt_start, dt_end, progress, role):
        self.assignee = assignee
        self.bug_id = bug_id
        self.dt_start = dt_start
        self.dt_end = dt_end
        self.progress = progress
        self.role = role

    def __str__(self):
        return (
            (
                "{0},{1},{2},{3},{4},{5}" 
            )
            if print_sql_flag else    
            (
                "===============================================================================\n" +
                "assignee: {0}\nbug_id: {1}\ndt_start: {2}\ndt_end: {3}\nprogress: {4}\nrole: {5}\n" +
                "===============================================================================\n"
            )
        ).format(self.assignee, self.bug_id, self.dt_start, self.dt_end, self.progress, self.role)


def gen_cmp_comment():
    return(
        random.choice(cmp_adjectives) + 
        " " + 
        random.choice(cmp_nouns) + 
        " " +
        '"{0}"'.format(random.choice(variable_names)) +
        " on line " +
        str(random.randint(1, 1000))
    )

def gen_rtm_comment():
    return(
        random.choice(rtm_phrases) +
        " at line " + 
        str(random.randint(1, 1000))
    )

def gen_lgc_comment():
    rand_index = random.randint(0,1)
    
    if rand_index == 0:
        return(
            lgc_phrases[0] +
            " at line " + 
            str(random.randint(1, 1000))
        )

    if rand_index == 1:
        return(
            lgc_phrases[1] +
            " for function " +
            random.choice(function_names) +
            " at line " + 
            str(random.randint(1, 1000))
        )

def gen_report_comment(bug_type):
    switcher = {
        'CMP': gen_cmp_comment(),
        'RTM': gen_rtm_comment(),
        'LGC': gen_lgc_comment(),
    }
    return switcher.get(bug_type)

def gen_bug_id():
    letters = string.ascii_letters
    ret_str = ''.join(random.choice(letters) for i in range(7))
    for bug in bugs:
        if ret_str == bug.bug_id:
            return gen_bug_id()
    return ret_str

def gen_random_datetime(start, end):    
    start_year = int(start[:4])
    start_month = int(start[5:7])
    start_day = int(start[8:10])

    end_year = int(end[:4])
    end_month = int(end[5:7])
    end_day = int(end[8:10])

    start_date = datetime.date(start_year, start_month, start_day)
    end_date = datetime.date(end_year, end_month, end_day)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)   
    random_date = start_date + datetime.timedelta(days=random_number_of_days)

    return str(random_date) + " " + str(random.randint(8, 17)).zfill(2) + ":" + str(random.randint(0, 59)).zfill(2) + ":" + str(random.randint(0, 59)).zfill(2) 

def check_for_duplicate_assignee(bug_assingment):
    flag = True
    for ba in bug_assignments:
        if ba.bug_id == bug.bug_id and ba.assignee == bug_assingment.assignee:
            flag = False
    return flag

for h in range(0, 3):
    for i in range(0, table_size):
        assignee_count = 15
        reportee_as_assingee = random.randint(0, 1) == 1
        f = '%Y-%m-%d %H:%M:%S'
        bug = Bug(gen_bug_id(), bug_types[h], gen_random_datetime('2020-08-01', '2020-11-29'), gen_report_comment(bug_types[h]), random.choice(usernames))
        bugs.insert(i, bug)
        start_date = datetime.datetime.strptime(bug.dt_reported, f) + datetime.timedelta(days=random.randint(0, 2))
        end_date = datetime.datetime.strptime(bug.dt_reported, f) + datetime.timedelta(days=random.randint(3, 7))
        for j in range(0, assignee_count):
            bug_assingment = BugAssignment(random.choice(usernames), bug.bug_id, start_date, end_date, random.randint(0, 255), random.choice(roles))
            if check_for_duplicate_assignee(bug_assingment):
                if bug_assingment.assignee == bug.reportee:
                    bug_assingment.role += " (reportee)"
                bug_assignments.insert(i, bug_assingment)
    
f = open('bugs.csv', "wa")
for b in bugs:
    f.write(str(b) + '\n')

f.close();
f = open('bug_assignments.csv', "wa")
for ba in bug_assignments:
    f.write(str(ba) + '\n')
