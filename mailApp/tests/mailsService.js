angular.module('mailApp').factory('mails', function() {
    var letters = {
        "inbox": [
            {
                "date": 1111111117915,
                "sender": "Петров Петр",
                "to": "Me",
                "tittle": "1230 123 kik20 23",
                "content": "mklmkwlef wekfwle fwekf lk232342394234 340248 2405094580294 04 502984 0928 4092 40958 2094 50924 50924 5092 459 2495 245 294 52094 50924 509248 520345820485029480925809485 2094850298 40958 20948 509284 095 2094 50 98928 0928450928 0928 4095 2094 094 2945 34538450 934095 309458 039508495830 45829470385760835706987508274 0587 204857 2094870284705982740985720498 57209 457094 570928 475098240958274085729485702948 0948 509284 50928 45729847509487509847 509847 5098475 09284750928475 092847 502948 570948 5702984 75029847509284709582740985720948750 2984 52984 50982 45709824750982 7450982 47095 240587 2498572495827 40958 274958204958 7204 52094857 0294857 0928475 092847 5092847 5092847 5092847 5092847 5092847 5092845 ",
                "favorite": false,
                "unread": false,
                "directory": "inbox",
                "deleted": false
            },
            {
                "date": 1222224887915,
                "sender": "Петров Петр",
                "to": "Me",
                "tittle": "faefmke e JNNKJNK NKn nkenfkwe jjjjJJJJJJ!",
                "content": "fkaldmflka dflkamdslfk aelk w;jtkr gwtr gw;jr w;jr fwekjr fwjrk fwkjrnf;kjwnr e;fkj wr;kjnf ;wjkr g;jkwrn g;jkwr g;kjw r;gjknfs;kjnsf;kjdn wkrg ;wkjrgn;kjnfg;skjdfngkjw rgkjwrng;jksnfoig[origj[woirmgwr gwkjrgkwjfng;kjndf;jgksn;kgnw; gw;krg;kwfng;skndfg;jkwnr;gkjwnr;gjnsfogmsodifmgwoeikmrgwej rgkjwerng;jkwe rgwnrgjwke rgkj gs;dfjkvfgn wjrgnwejrng;jdfg sdfgerfkqwrf ekgs fdgsndf glwekjrgn;wjerngwkjr gw;ekjrgnwirjfpoirgjsogkjernglkj rekjnrka dvnz;dfjk va; naif ka dfjvnainvna fvjka d;ifna;j ja rj aerjg eirgn;ajk gajr ;gkja er;gjknrg;jks gkjs r;ijgnerign;j rg;k r;gjn;ireng;sing;isngoinreg[oiwnrg[oiw gwnrgiwnrger g",
                "favorite": true,
                "unread": false,
                "directory": "inbox",
                "deleted": false
            },
            {
                "date": 1474294087915,
                "sender": "Натальина Наталья",
                "to": "Me",
                "tittle": "Самое первое письмо на данный момент",
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus, elit vitae elementum convallis, mauris ipsum posuere magna, sit amet sodales quam enim a libero. Phasellus consectetur blandit velit eget varius. Pellentesque volutpat, elit molestie finibus pharetra, tortor urna egestas neque, at gravida ligula turpis a lorem. Nullam non lorem id neque ultrices dignissim. Aliquam ipsum nulla, pellentesque ut diam id, faucibus cursus lectus. Cras sodales consequat ex vel aliquet. Sed sit amet laoreet magna, ac convallis augue. Ut diam nisi, placerat eu nibh sit amet, euismod fringilla urna. Integer hendrerit tellus non diam congue dapibus. Nunc pretium sem felis, semper iaculis sapien ornare eu. Quisque nec luctus tortor.Donec ullamcorper, dolor ac maximus ornare, nulla nulla facilisis ipsum, id laoreet arcu erat eu mi. Morbi quam libero, vehicula eu felis at, bibendum rutrum nibh. Morbi vel sapien a turpis rhoncus tempor. Etiam scelerisque magna ac leo lacinia, sed accumsan ipsum lacinia. Cras leo metus, laoreet vitae ipsum et, mattis molestie tellus. Morbi pharetra diam sit amet velit gravida volutpat. Etiam vel blandit arcu, a accumsan quam.Vestibulum ac neque turpis. Curabitur convallis leo risus, eget ornare lorem sollicitudin a. Praesent in quam ipsum. Aenean ornare feugiat mauris, a iaculis nulla rhoncus et. Cras scelerisque risus vel leo finibus dapibus. Ut interdum tincidunt nisi sed mattis. Donec quis finibus sapien. Quisque porta posuere tristique. Integer in interdum eros, vel eleifend dolor. Sed sed lacinia enim, in interdum dolor.In posuere tellus id ante suscipit, id sollicitudin erat facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt, ipsum iaculis eleifend sagittis, magna nisi malesuada nunc, congue rutrum sem nunc in ligula. Aliquam ut eros fermentum, tincidunt nibh sed, mattis urna. Proin velit dui, scelerisque a ullamcorper sit amet, porttitor at dui. Nunc nec eros leo. Curabitur hendrerit accumsan condimentum. Morbi tincidunt ornare scelerisque. Donec vel efficitur nibh. Ut eu aliquet velit, id viverra mauris.",
                "favorite": false,
                "unread": true,
                "directory": "inbox",
                "deleted": false
            },
            {
                "date": 1424246887915,
                "sender": "Иванов Иван",
                "to": "Me",
                "tittle": "Просто обычная тема для нового письма",
                "content": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
                "favorite": false,
                "unread": true,
                "directory": "inbox",
                "deleted": false
            },
            {
                "date": 1414274887915,
                "sender": "Петров Петр",
                "to": "Me",
                "tittle": "Вот такая вот тема у письма",
                "content": "Нет ни элитных, ни «слабеньких». В самой крупной школе страны учится 960 учеников. В самой маленькой — 11. Все имеют абсолютно одинаковое оборудование, возможности и пропорциональное финансирование. Почти все школы — государственные, есть десяток частно-государственных. Разница, кроме того, что родители вносят частичную оплату, — в повышенных требованиях к ученикам. Как правило, это своеобразные «педагогические» лаборатории, следующие выбранной педагогике: Монтессори, Френе, Мортана и Вальдорфская школы. К частным относятся и учреждения с преподаванием на английском, немецком, французском Следуя принципу равенства, в Финляндии существует параллельная система образования «от детских садов до университетов» на шведском языке. Не забыты и интересы саамского народа, на севере страны можно обучаться на родном языке.До недавнего времени финнам было запрещено выбирать школу, следовало отдавать детей в «ближайшую». Запрет сняли, но большинство родителей так и отдают детей «поближе», ведь все школы одинаково хороши.",
                "favorite": true,
                "unread": false,
                "directory": "inbox",
                "deleted": false
            },
            {
                "date": 1288320000000,
                "sender": "Masha Dashkina",
                "to": "Me",
                "tittle": "Letter not Found",
                "content": "Mopnn fyc hvh hctrxxrc vguutdc c hh! Jbvgh ug hvnv  v uyuyguy uygug v vjk jgcxdxseetk. Lnjnkvzwyuo[lkdx",
                "favorite": false,
                "unread": false,
                "directory": "inbox",
                "deleted": false
            },
            {
                "date": 1288323623006,
                "sender": "Masha Dashkina",
                "to": "Me",
                "tittle": "Hello! It`s your turn!",
                "content": "mkmklmklkj bouiytf rt utrdutrf tfyf yguyg uhiuhiuh igkvf yvf ytvy tvf ytft",
                "favorite": true,
                "unread": false,
                "directory": "inbox",
                "deleted": false
            }
        ],
        "sent": [
            {
                "date": 1288323333333,
                "sender": "I",
                "to": "Petya Koshkin",
                "tittle": "Big news today! ",
                "content": "Omkwefkwe wefkmwkef krg wkjrg wongowt gwotgmwormgwkrg ka! Pmskld sdslv sb s bs bkrmbkamdfkl avalfkvmalf vakvlakv l?sdsl,dsdf sfkfkfml!",
                "favorite": true,
                "unread": false,
                "directory": "sent",
                "deleted": false
            },
            {
                "date": 1288321111111,
                "sender": "I",
                "to": "Masha Dashkina",
                "tittle": "Letter not Found",
                "content": "Not for this sdmklsf law !ml efmwlefm wklmP fmwelkmfw .wefwef wefwefwlkmefl weflkwmefwdioidvsoidnwoefnwke fwkefdkfmsdfef wefkmdlfkmsdf",
                "favorite": false,
                "unread": false,
                "directory": "sent",
                "deleted": false
            },
            {
                "date": 1288326666666,
                "sender": "I",
                "to": "Vasya Petkin",
                "tittle": "Realy very-very-very big-big-big title!!!!!!!",
                "content": "nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting",
                "favorite": false,
                "unread": false,
                "directory": "sent",
                "deleted": false
            }
        ],
        "trash": [
            {
                "date": 1288323623006,
                "sender": "Katya Dikaya",
                "to": "Me",
                "tittle": "!!!Nice to eat you!!!",
                "content": "Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! ",
                "favorite": false,
                "unread": false,
                "directory": "inbox",
                "deleted": true
            }
        ],
        "drafts": [
            {
                "date": 1288326232323,
                "sender": "I",
                "to": "",
                "tittle": "Без темы...",
                "content": "",
                "favorite": false,
                "unread": false,
                "directory": "drafts",
                "deleted": false
            }
        ]
    }



    return letters;
});