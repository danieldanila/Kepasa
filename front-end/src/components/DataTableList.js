import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import SearchBar from "./SearchBar";
import styles from "../styles/DataTableList.module.css";
import { InputText } from "primereact/inputtext";

export default function DataTableList() {
  const [data, setData] = useState([
    {
      id: 1,
      fullName: "Thain Daine",
      department: "Engineering",
      role: "Database Administrator II",
      email: "tdaine0@about.me",
      phone: "8272943253",
      socialMediaLink: "http://arizona.edu/lectus.js",
    },
    {
      id: 2,
      fullName: "Bartholemy Shillitto",
      department: "Marketing",
      role: "Tax Accountant",
      email: "bshillitto1@telegraph.co.uk",
      phone: "1324566701",
      socialMediaLink: "http://constantcontact.com/parturient/montes.html",
    },
    {
      id: 3,
      fullName: "Stephine Kinnier",
      department: "Accounting",
      role: "Occupational Therapist",
      email: "skinnier2@wiley.com",
      phone: "8574890351",
      socialMediaLink:
        "https://ameblo.jp/tristique/fusce/congue/diam/id/ornare.png",
    },
    {
      id: 4,
      fullName: "Kare Bodell",
      department: "Business Development",
      role: "Staff Accountant II",
      email: "kbodell3@sogou.com",
      phone: "6224390097",
      socialMediaLink:
        "http://google.com.br/ligula/nec/sem/duis/aliquam/convallis.jpg",
    },
    {
      id: 5,
      fullName: "Juli Bowmer",
      department: "Product Management",
      role: "Dental Hygienist",
      email: "jbowmer4@cnbc.com",
      phone: "3226657674",
      socialMediaLink:
        "http://admin.ch/pede/venenatis/non/sodales/sed/tincidunt/eu.json",
    },
    {
      id: 6,
      fullName: "Rustie Silversmidt",
      department: "Services",
      role: "Senior Editor",
      email: "rsilversmidt5@vkontakte.ru",
      phone: "5432484708",
      socialMediaLink:
        "https://timesonline.co.uk/aliquet/massa/id/lobortis/convallis/tortor.json",
    },
    {
      id: 7,
      fullName: "Monique Covington",
      department: "Accounting",
      role: "Administrative Officer",
      email: "mcovington6@forbes.com",
      phone: "4465080294",
      socialMediaLink:
        "http://webnode.com/velit/id/pretium/iaculis/diam/erat/fermentum.jsp",
    },
    {
      id: 8,
      fullName: "Lev Keating",
      department: "Product Management",
      role: "Technical Writer",
      email: "lkeating7@techcrunch.com",
      phone: "8956862475",
      socialMediaLink: "https://myspace.com/mattis.xml",
    },
    {
      id: 9,
      fullName: "Inness Belle",
      department: "Accounting",
      role: "VP Sales",
      email: "ibelle8@disqus.com",
      phone: "1082553071",
      socialMediaLink:
        "http://washingtonpost.com/ultrices/vel/augue/vestibulum/ante.js",
    },
    {
      id: 10,
      fullName: "Maurene Slamaker",
      department: "Product Management",
      role: "Clinical Specialist",
      email: "mslamaker9@unc.edu",
      phone: "8358543103",
      socialMediaLink: "http://mtv.com/leo.xml",
    },
    {
      id: 11,
      fullName: "Kippy Rigden",
      department: "Services",
      role: "Tax Accountant",
      email: "krigdena@wufoo.com",
      phone: "2602576067",
      socialMediaLink: "https://census.gov/a.json",
    },
    {
      id: 12,
      fullName: "Aldrich Gebbie",
      department: "Research and Development",
      role: "VP Marketing",
      email: "agebbieb@google.com.hk",
      phone: "1207817192",
      socialMediaLink:
        "https://desdev.cn/massa/id/lobortis/convallis/tortor/risus/dapibus.json",
    },
    {
      id: 13,
      fullName: "Jdavie Crofts",
      department: "Services",
      role: "Geologist II",
      email: "jcroftsc@wsj.com",
      phone: "3313542140",
      socialMediaLink: "https://github.io/bibendum/felis/sed/interdum.aspx",
    },
    {
      id: 14,
      fullName: "Laural Molder",
      department: "Services",
      role: "Sales Associate",
      email: "lmolderd@auda.org.au",
      phone: "5594187644",
      socialMediaLink: "http://yellowbook.com/porttitor/lacus.aspx",
    },
    {
      id: 15,
      fullName: "Kaila Arrow",
      department: "Engineering",
      role: "Account Coordinator",
      email: "karrowe@stanford.edu",
      phone: "8627974939",
      socialMediaLink: "http://printfriendly.com/non/mauris.aspx",
    },
    {
      id: 16,
      fullName: "Arlie Sneezum",
      department: "Engineering",
      role: "Compensation Analyst",
      email: "asneezumf@nature.com",
      phone: "2026964156",
      socialMediaLink: "http://instagram.com/non/pretium/quis.aspx",
    },
    {
      id: 17,
      fullName: "Florentia O' Lone",
      department: "Training",
      role: "Programmer Analyst III",
      email: "fog@sbwire.com",
      phone: "3021226393",
      socialMediaLink: "http://arizona.edu/ipsum/integer.xml",
    },
    {
      id: 18,
      fullName: "Beltran Gonnin",
      department: "Product Management",
      role: "Software Test Engineer I",
      email: "bgonninh@mashable.com",
      phone: "2069726367",
      socialMediaLink: "http://t-online.de/nulla.xml",
    },
    {
      id: 19,
      fullName: "Johnnie Trewhitt",
      department: "Support",
      role: "Environmental Tech",
      email: "jtrewhitti@lycos.com",
      phone: "2029910650",
      socialMediaLink:
        "https://bigcartel.com/nulla/nunc/purus/phasellus/in/felis/donec.json",
    },
    {
      id: 20,
      fullName: "Elijah Plank",
      department: "Sales",
      role: "Environmental Specialist",
      email: "eplankj@123-reg.co.uk",
      phone: "1432111682",
      socialMediaLink: "http://ovh.net/ut/nunc.jpg",
    },
    {
      id: 21,
      fullName: "Even Djurevic",
      department: "Support",
      role: "Professor",
      email: "edjurevick@t.co",
      phone: "3023524872",
      socialMediaLink:
        "http://mediafire.com/lacus/morbi/sem/mauris/laoreet.html",
    },
    {
      id: 22,
      fullName: "Alyce Keynes",
      department: "Training",
      role: "Geological Engineer",
      email: "akeynesl@eventbrite.com",
      phone: "5473641541",
      socialMediaLink:
        "https://forbes.com/magna/vestibulum/aliquet/ultrices.js",
    },
    {
      id: 23,
      fullName: "Darren Hillam",
      department: "Engineering",
      role: "Business Systems Development Analyst",
      email: "dhillamm@hc360.com",
      phone: "9443833089",
      socialMediaLink: "http://reference.com/bibendum/imperdiet.aspx",
    },
    {
      id: 24,
      fullName: "Star Marchment",
      department: "Sales",
      role: "Systems Administrator I",
      email: "smarchmentn@netvibes.com",
      phone: "6192370990",
      socialMediaLink: "https://aol.com/viverra.html",
    },
    {
      id: 25,
      fullName: "Cymbre McCool",
      department: "Research and Development",
      role: "Account Executive",
      email: "cmccoolo@imdb.com",
      phone: "5698725603",
      socialMediaLink: "https://independent.co.uk/dapibus/augue.js",
    },
    {
      id: 26,
      fullName: "Sophey Salmen",
      department: "Accounting",
      role: "Structural Analysis Engineer",
      email: "ssalmenp@sbwire.com",
      phone: "9147582142",
      socialMediaLink: "http://ehow.com/tempus/semper/est.js",
    },
    {
      id: 27,
      fullName: "Kylila Symmons",
      department: "Product Management",
      role: "Financial Analyst",
      email: "ksymmonsq@youku.com",
      phone: "3427130340",
      socialMediaLink: "https://wsj.com/et/ultrices.xml",
    },
    {
      id: 28,
      fullName: "Selle Burbudge",
      department: "Accounting",
      role: "Actuary",
      email: "sburbudger@gnu.org",
      phone: "7258667326",
      socialMediaLink: "https://privacy.gov.au/cursus.png",
    },
    {
      id: 29,
      fullName: "Natale Genty",
      department: "Research and Development",
      role: "Recruiting Manager",
      email: "ngentys@accuweather.com",
      phone: "5951124553",
      socialMediaLink: "https://ihg.com/ante/nulla/justo.jpg",
    },
    {
      id: 30,
      fullName: "Christal Margery",
      department: "Legal",
      role: "Associate Professor",
      email: "cmargeryt@mozilla.com",
      phone: "5329972901",
      socialMediaLink: "https://artisteer.com/nunc.html",
    },
    {
      id: 31,
      fullName: "Candie Roughsedge",
      department: "Legal",
      role: "Research Associate",
      email: "croughsedgeu@xinhuanet.com",
      phone: "5764371238",
      socialMediaLink: "https://mac.com/est.aspx",
    },
    {
      id: 32,
      fullName: "Law Milan",
      department: "Research and Development",
      role: "Data Coordinator",
      email: "lmilanv@typepad.com",
      phone: "3485650485",
      socialMediaLink: "http://ft.com/maecenas.html",
    },
    {
      id: 33,
      fullName: "April Eddison",
      department: "Accounting",
      role: "Financial Advisor",
      email: "aeddisonw@ning.com",
      phone: "7305467279",
      socialMediaLink:
        "https://narod.ru/iaculis/congue/vivamus/metus/arcu/adipiscing.html",
    },
    {
      id: 34,
      fullName: "Clementine McKeady",
      department: "Support",
      role: "Junior Executive",
      email: "cmckeadyx@upenn.edu",
      phone: "9362351335",
      socialMediaLink: "http://mediafire.com/nunc.js",
    },
    {
      id: 35,
      fullName: "Cory Deverill",
      department: "Product Management",
      role: "Information Systems Manager",
      email: "cdeverilly@vinaora.com",
      phone: "1801610245",
      socialMediaLink: "https://google.com/aliquam/sit.html",
    },
    {
      id: 36,
      fullName: "Cami Cohani",
      department: "Legal",
      role: "Account Representative IV",
      email: "ccohaniz@yandex.ru",
      phone: "4134206884",
      socialMediaLink: "http://cnet.com/mi/pede/malesuada/in.js",
    },
    {
      id: 37,
      fullName: "Ash Cook",
      department: "Engineering",
      role: "Civil Engineer",
      email: "acook10@ucla.edu",
      phone: "1906267462",
      socialMediaLink: "http://blog.com/interdum/eu/tincidunt.png",
    },
    {
      id: 38,
      fullName: "Berkeley McKechnie",
      department: "Research and Development",
      role: "Financial Analyst",
      email: "bmckechnie11@php.net",
      phone: "2366904608",
      socialMediaLink:
        "https://dell.com/mi/pede/malesuada/in/imperdiet/et/commodo.jsp",
    },
    {
      id: 39,
      fullName: "Harriette Hradsky",
      department: "Legal",
      role: "Analyst Programmer",
      email: "hhradsky12@cyberchimps.com",
      phone: "7459731797",
      socialMediaLink: "http://theatlantic.com/integer/aliquet.aspx",
    },
    {
      id: 40,
      fullName: "Frederic Bonnette",
      department: "Engineering",
      role: "Design Engineer",
      email: "fbonnette13@is.gd",
      phone: "4239574329",
      socialMediaLink:
        "https://pcworld.com/massa/id/nisl/venenatis/lacinia/aenean/sit.json",
    },
    {
      id: 41,
      fullName: "Rheba Worviell",
      department: "Product Management",
      role: "Operator",
      email: "rworviell14@fc2.com",
      phone: "3667693745",
      socialMediaLink: "http://psu.edu/libero/nam/dui/proin.jpg",
    },
    {
      id: 42,
      fullName: "Eadith Sacaze",
      department: "Support",
      role: "Recruiter",
      email: "esacaze15@twitter.com",
      phone: "5451053524",
      socialMediaLink: "http://imgur.com/montes/nascetur/ridiculus.aspx",
    },
    {
      id: 43,
      fullName: "Hana Overstone",
      department: "Training",
      role: "Financial Advisor",
      email: "hoverstone16@irs.gov",
      phone: "6175533716",
      socialMediaLink: "https://imageshack.us/nulla.xml",
    },
    {
      id: 44,
      fullName: "Norry Paylie",
      department: "Services",
      role: "Compensation Analyst",
      email: "npaylie17@techcrunch.com",
      phone: "4677752561",
      socialMediaLink: "https://jalbum.net/lectus/pellentesque/at/nulla.jsp",
    },
    {
      id: 45,
      fullName: "Abagael Escot",
      department: "Engineering",
      role: "Help Desk Operator",
      email: "aescot18@chron.com",
      phone: "8574028709",
      socialMediaLink:
        "https://themeforest.net/ipsum/primis/in/faucibus/orci.jsp",
    },
    {
      id: 46,
      fullName: "Marcy Gonin",
      department: "Support",
      role: "Dental Hygienist",
      email: "mgonin19@biglobe.ne.jp",
      phone: "4478050325",
      socialMediaLink: "http://usa.gov/proin/interdum/mauris/non/ligula.xml",
    },
    {
      id: 47,
      fullName: "Neale Girling",
      department: "Product Management",
      role: "Director of Sales",
      email: "ngirling1a@ibm.com",
      phone: "4239536507",
      socialMediaLink: "http://nps.gov/lacus/morbi/quis/tortor.jsp",
    },
    {
      id: 48,
      fullName: "Puff Ottey",
      department: "Services",
      role: "Internal Auditor",
      email: "pottey1b@ifeng.com",
      phone: "3583954252",
      socialMediaLink: "https://netlog.com/odio/condimentum/id.jpg",
    },
    {
      id: 49,
      fullName: "Lorry Lissandri",
      department: "Accounting",
      role: "Analog Circuit Design manager",
      email: "llissandri1c@shareasale.com",
      phone: "6431467255",
      socialMediaLink:
        "https://buzzfeed.com/ultrices/erat/tortor/sollicitudin/mi/sit/amet.jpg",
    },
    {
      id: 50,
      fullName: "Lyman Granville",
      department: "Sales",
      role: "Legal Assistant",
      email: "lgranville1d@slideshare.net",
      phone: "2644329803",
      socialMediaLink:
        "http://mysql.com/odio/justo/sollicitudin/ut/suscipit.jsp",
    },
    {
      id: 51,
      fullName: "Robbie Spurriar",
      department: "Engineering",
      role: "Community Outreach Specialist",
      email: "rspurriar1e@wsj.com",
      phone: "6799005870",
      socialMediaLink:
        "https://themeforest.net/congue/etiam/justo/etiam/pretium.json",
    },
    {
      id: 52,
      fullName: "Adrianne Whitnell",
      department: "Training",
      role: "GIS Technical Architect",
      email: "awhitnell1f@blogspot.com",
      phone: "6422575458",
      socialMediaLink:
        "https://tripod.com/hac/habitasse/platea/dictumst/etiam/faucibus.jsp",
    },
    {
      id: 53,
      fullName: "Barnabas Woodard",
      department: "Support",
      role: "Systems Administrator I",
      email: "bwoodard1g@google.pl",
      phone: "5381834865",
      socialMediaLink: "http://homestead.com/vel/lectus/in.png",
    },
    {
      id: 54,
      fullName: "Malvin De Hoogh",
      department: "Legal",
      role: "Staff Accountant I",
      email: "mde1h@xing.com",
      phone: "6902754703",
      socialMediaLink: "http://constantcontact.com/non/pretium.jsp",
    },
    {
      id: 55,
      fullName: "Margo Roose",
      department: "Product Management",
      role: "VP Marketing",
      email: "mroose1i@slideshare.net",
      phone: "5463155505",
      socialMediaLink: "http://boston.com/quam.xml",
    },
    {
      id: 56,
      fullName: "Linn Celli",
      department: "Training",
      role: "Information Systems Manager",
      email: "lcelli1j@theguardian.com",
      phone: "1544441561",
      socialMediaLink: "http://hatena.ne.jp/at/turpis/donec.png",
    },
    {
      id: 57,
      fullName: "Kerianne Izakof",
      department: "Accounting",
      role: "Programmer Analyst III",
      email: "kizakof1k@wordpress.org",
      phone: "4879896008",
      socialMediaLink:
        "http://miibeian.gov.cn/porttitor/lorem/id/ligula/suspendisse/ornare.html",
    },
    {
      id: 58,
      fullName: "Reagen Yegorkin",
      department: "Legal",
      role: "Speech Pathologist",
      email: "ryegorkin1l@blogtalkradio.com",
      phone: "7541599475",
      socialMediaLink: "https://apache.org/justo/in/blandit.html",
    },
    {
      id: 59,
      fullName: "Ingamar Brownscombe",
      department: "Research and Development",
      role: "Social Worker",
      email: "ibrownscombe1m@123-reg.co.uk",
      phone: "8152580032",
      socialMediaLink: "http://vkontakte.ru/quam/sollicitudin/vitae.jsp",
    },
    {
      id: 60,
      fullName: "Lazarus Vicker",
      department: "Support",
      role: "VP Product Management",
      email: "lvicker1n@surveymonkey.com",
      phone: "3911932893",
      socialMediaLink:
        "https://vimeo.com/mauris/vulputate/elementum/nullam/varius/nulla/facilisi.png",
    },
    {
      id: 61,
      fullName: "Cordy Fetherstan",
      department: "Business Development",
      role: "Librarian",
      email: "cfetherstan1o@army.mil",
      phone: "3698303676",
      socialMediaLink: "https://flavors.me/orci/luctus/et.aspx",
    },
    {
      id: 62,
      fullName: "Laural Cheal",
      department: "Marketing",
      role: "Staff Accountant IV",
      email: "lcheal1p@indiegogo.com",
      phone: "4046559172",
      socialMediaLink: "https://webeden.co.uk/mattis/nibh.html",
    },
    {
      id: 63,
      fullName: "Ester Vina",
      department: "Product Management",
      role: "Electrical Engineer",
      email: "evina1q@tripod.com",
      phone: "4979039936",
      socialMediaLink: "https://mtv.com/in/eleifend/quam/a/odio/in.xml",
    },
    {
      id: 64,
      fullName: "Doyle Korneluk",
      department: "Sales",
      role: "Dental Hygienist",
      email: "dkorneluk1r@privacy.gov.au",
      phone: "3868630314",
      socialMediaLink:
        "https://flickr.com/sit/amet/sapien/dignissim/vestibulum.aspx",
    },
    {
      id: 65,
      fullName: "Cookie Suttill",
      department: "Product Management",
      role: "Senior Cost Accountant",
      email: "csuttill1s@sogou.com",
      phone: "1543071158",
      socialMediaLink: "http://delicious.com/sodales/sed.jpg",
    },
    {
      id: 66,
      fullName: "Conway Cornu",
      department: "Legal",
      role: "VP Marketing",
      email: "ccornu1t@123-reg.co.uk",
      phone: "8852117469",
      socialMediaLink:
        "https://bizjournals.com/in/purus/eu/magna/vulputate/luctus.aspx",
    },
    {
      id: 67,
      fullName: "Meryl Chatainier",
      department: "Sales",
      role: "Internal Auditor",
      email: "mchatainier1u@cdbaby.com",
      phone: "6206606925",
      socialMediaLink: "https://mysql.com/viverra/dapibus.aspx",
    },
    {
      id: 68,
      fullName: "Lu Soppett",
      department: "Marketing",
      role: "Paralegal",
      email: "lsoppett1v@moonfruit.com",
      phone: "2703547861",
      socialMediaLink: "http://deviantart.com/dolor.png",
    },
    {
      id: 69,
      fullName: "Rosita Circuit",
      department: "Services",
      role: "Quality Control Specialist",
      email: "rcircuit1w@alexa.com",
      phone: "3868076218",
      socialMediaLink: "https://drupal.org/mattis/odio.html",
    },
    {
      id: 70,
      fullName: "Boycie Meech",
      department: "Accounting",
      role: "Systems Administrator IV",
      email: "bmeech1x@so-net.ne.jp",
      phone: "1502736440",
      socialMediaLink:
        "http://wix.com/ullamcorper/augue/a/suscipit/nulla/elit.json",
    },
    {
      id: 71,
      fullName: "Jinny Founds",
      department: "Business Development",
      role: "Marketing Manager",
      email: "jfounds1y@stumbleupon.com",
      phone: "9122588171",
      socialMediaLink: "https://domainmarket.com/sociis/natoque.json",
    },
    {
      id: 72,
      fullName: "Pat Gamble",
      department: "Business Development",
      role: "Analyst Programmer",
      email: "pgamble1z@blog.com",
      phone: "9739044260",
      socialMediaLink: "https://wiley.com/sodales/sed/tincidunt/eu/felis.aspx",
    },
    {
      id: 73,
      fullName: "Nike Garthshore",
      department: "Accounting",
      role: "Senior Editor",
      email: "ngarthshore20@shop-pro.jp",
      phone: "6078416629",
      socialMediaLink: "http://state.tx.us/vulputate/nonummy/maecenas.html",
    },
    {
      id: 74,
      fullName: "Vanny Hembrow",
      department: "Sales",
      role: "Technical Writer",
      email: "vhembrow21@scientificamerican.com",
      phone: "2044981975",
      socialMediaLink: "https://ox.ac.uk/ut/erat/curabitur.html",
    },
    {
      id: 75,
      fullName: "Lezlie Santora",
      department: "Engineering",
      role: "Tax Accountant",
      email: "lsantora22@globo.com",
      phone: "6548383440",
      socialMediaLink:
        "https://diigo.com/interdum/mauris/non/ligula/pellentesque.jpg",
    },
    {
      id: 76,
      fullName: "Gaspard Babin",
      department: "Sales",
      role: "Health Coach IV",
      email: "gbabin23@smh.com.au",
      phone: "2984397982",
      socialMediaLink: "http://google.com/at/feugiat/non/pretium/quis.jpg",
    },
    {
      id: 77,
      fullName: "Priscilla Blaschek",
      department: "Product Management",
      role: "Operator",
      email: "pblaschek24@wikimedia.org",
      phone: "4087454903",
      socialMediaLink: "http://php.net/lorem/quisque.html",
    },
    {
      id: 78,
      fullName: "Donall O'Rowane",
      department: "Human Resources",
      role: "Programmer Analyst I",
      email: "dorowane25@sbwire.com",
      phone: "2233643595",
      socialMediaLink: "http://boston.com/enim/lorem/ipsum/dolor/sit/amet.png",
    },
    {
      id: 79,
      fullName: "Carlita Worsam",
      department: "Research and Development",
      role: "Sales Representative",
      email: "cworsam26@census.gov",
      phone: "3348011487",
      socialMediaLink:
        "http://nba.com/lorem/ipsum/dolor/sit/amet/consectetuer.aspx",
    },
    {
      id: 80,
      fullName: "Jodie Mosten",
      department: "Accounting",
      role: "Internal Auditor",
      email: "jmosten27@rediff.com",
      phone: "4313906115",
      socialMediaLink: "https://chron.com/id/luctus/nec/molestie.aspx",
    },
    {
      id: 81,
      fullName: "Cordie Wiltsher",
      department: "Product Management",
      role: "Marketing Assistant",
      email: "cwiltsher28@marriott.com",
      phone: "9766593393",
      socialMediaLink: "http://dot.gov/erat/vestibulum.js",
    },
    {
      id: 82,
      fullName: "Aluin Philipard",
      department: "Marketing",
      role: "Staff Scientist",
      email: "aphilipard29@addthis.com",
      phone: "9273928230",
      socialMediaLink: "https://chicagotribune.com/sollicitudin.json",
    },
    {
      id: 83,
      fullName: "Cicily Sichardt",
      department: "Sales",
      role: "Associate Professor",
      email: "csichardt2a@tamu.edu",
      phone: "2169802194",
      socialMediaLink: "http://utexas.edu/congue.js",
    },
    {
      id: 84,
      fullName: "Linda Quinton",
      department: "Business Development",
      role: "Office Assistant IV",
      email: "lquinton2b@histats.com",
      phone: "4209807943",
      socialMediaLink: "https://com.com/nisi/at/nibh/in.json",
    },
    {
      id: 85,
      fullName: "Edan Brightman",
      department: "Marketing",
      role: "Accounting Assistant II",
      email: "ebrightman2c@geocities.com",
      phone: "8913541686",
      socialMediaLink: "http://rambler.ru/nulla/neque/libero.jpg",
    },
    {
      id: 86,
      fullName: "Sallyann Ferby",
      department: "Support",
      role: "Marketing Manager",
      email: "sferby2d@marketwatch.com",
      phone: "5205794262",
      socialMediaLink: "http://nbcnews.com/turpis/sed/ante.jsp",
    },
    {
      id: 87,
      fullName: "Ailene Emm",
      department: "Legal",
      role: "Statistician III",
      email: "aemm2e@nymag.com",
      phone: "1327501006",
      socialMediaLink: "http://cbc.ca/ullamcorper.aspx",
    },
    {
      id: 88,
      fullName: "Trevar Gehrels",
      department: "Marketing",
      role: "Accounting Assistant I",
      email: "tgehrels2f@unicef.org",
      phone: "8319219145",
      socialMediaLink: "https://slate.com/mi/nulla/ac/enim/in.jpg",
    },
    {
      id: 89,
      fullName: "Keriann Beldan",
      department: "Accounting",
      role: "Mechanical Systems Engineer",
      email: "kbeldan2g@netscape.com",
      phone: "1699454306",
      socialMediaLink: "http://unesco.org/sapien/in/sapien.xml",
    },
    {
      id: 90,
      fullName: "Demetris Mulrean",
      department: "Product Management",
      role: "Recruiting Manager",
      email: "dmulrean2h@scribd.com",
      phone: "7968894175",
      socialMediaLink: "https://reverbnation.com/eros/viverra/eget.jsp",
    },
    {
      id: 91,
      fullName: "Darill Reymers",
      department: "Legal",
      role: "GIS Technical Architect",
      email: "dreymers2i@apache.org",
      phone: "8037467929",
      socialMediaLink: "https://shutterfly.com/sapien.html",
    },
    {
      id: 92,
      fullName: "Myrta Kyteley",
      department: "Accounting",
      role: "Editor",
      email: "mkyteley2j@ycombinator.com",
      phone: "1691127660",
      socialMediaLink: "http://dion.ne.jp/risus/dapibus.jpg",
    },
    {
      id: 93,
      fullName: "Garrot Trehearne",
      department: "Engineering",
      role: "Professor",
      email: "gtrehearne2k@angelfire.com",
      phone: "3425355990",
      socialMediaLink:
        "http://tripod.com/nulla/pede/ullamcorper/augue/a/suscipit.jsp",
    },
    {
      id: 94,
      fullName: "Dottie Flohard",
      department: "Human Resources",
      role: "VP Marketing",
      email: "dflohard2l@163.com",
      phone: "8407137788",
      socialMediaLink: "http://soundcloud.com/aenean/lectus/pellentesque.aspx",
    },
    {
      id: 95,
      fullName: "Jannel Menicomb",
      department: "Legal",
      role: "Director of Sales",
      email: "jmenicomb2m@yellowpages.com",
      phone: "2221870984",
      socialMediaLink: "https://google.fr/sit/amet/eros.js",
    },
    {
      id: 96,
      fullName: "Austina Bonick",
      department: "Business Development",
      role: "Data Coordinator",
      email: "abonick2n@time.com",
      phone: "8605712048",
      socialMediaLink:
        "http://statcounter.com/in/sagittis/dui/vel/nisl/duis/ac.xml",
    },
    {
      id: 97,
      fullName: "Lewie Eve",
      department: "Training",
      role: "Information Systems Manager",
      email: "leve2o@behance.net",
      phone: "3118654981",
      socialMediaLink: "https://imgur.com/in.png",
    },
    {
      id: 98,
      fullName: "Clementia Ugoletti",
      department: "Training",
      role: "Technical Writer",
      email: "cugoletti2p@uol.com.br",
      phone: "3792113842",
      socialMediaLink: "https://etsy.com/eros/viverra.json",
    },
    {
      id: 99,
      fullName: "Debbie McKearnen",
      department: "Support",
      role: "Accounting Assistant I",
      email: "dmckearnen2q@wordpress.org",
      phone: "8944903049",
      socialMediaLink: "https://ucsd.edu/tempus/vivamus/in.jpg",
    },
    {
      id: 100,
      fullName: "Petronilla Boschmann",
      department: "Marketing",
      role: "Legal Assistant",
      email: "pboschmann2r@google.nl",
      phone: "2085480101",
      socialMediaLink: "http://nature.com/quis/turpis/sed/ante.json",
    },
  ]);

  const columns = [
    {
      field: "fullName",
      header: "Full Name",
    },
    {
      field: "department",
      header: "Department",
    },
    {
      field: "role",
      header: "Role",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "phone",
      header: "Phone",
    },
    {
      field: "socialMediaLink",
      header: "Social Media Link",
    },
  ];

  useEffect(() => {
    initialFilters();
  }, []);

  const [filters, setFilters] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const dataTableRef = useRef(null);

  const initialFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      fullName: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      department: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      role: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      phone: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      socialMediaLink: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
    });
  };

  const clearFilters = () => {
    initialFilters();
    setSelectedData(null);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let filtersCopy = { ...filters };

    filtersCopy["global"].value = value;
    setFilters(filtersCopy);
  };

  const exportCSV = (selectionOnly) => {
    dataTableRef.current.exportCSV({ selectionOnly });
  };

  const header = (
    <div className={styles.headerContainer}>
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        onClick={clearFilters}
      />
      <Button
        type="button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
      <SearchBar
        items={[]}
        losesFocus={false}
        placeHolder="Search people"
        customOnChange={onGlobalFilterChange}
      />
    </div>
  );

  const onRowEditComplete = (e) => {
    let dataCopy = [...data];
    let { newData, index } = e;
    dataCopy[index] = newData;
    setData(dataCopy);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  return (
    <>
      <DataTable
        ref={dataTableRef}
        showGridlines
        value={data}
        removableSort
        paginator
        rows={25}
        rowsPerPageOptions={[5, 25, 50, 75, 100]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        dataKey="id"
        header={header}
        filters={filters}
        filterDisplay="menu"
        emptyMessage="No people found"
        selectionMode="multiple"
        dragSelection
        selection={selectedData}
        onSelectionChange={(e) => setSelectedData(e.value)}
        selectionPageOnly
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        scrollable
        scrollHeight="50rem"
      >
        <Column selectionMode="multiple" />
        {columns.map((column) => (
          <Column
            sortable
            filter
            filterPlaceholder={`Search by ${column.header}`}
            key={column.field}
            field={column.field}
            header={column.header}
            editor={(options) => textEditor(options)}
          />
        ))}
        <Column rowEditor />
      </DataTable>
    </>
  );
}