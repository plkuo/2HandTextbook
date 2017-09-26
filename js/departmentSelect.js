var collegeSelect= document.getElementById('collegeInput');
var departmentSelect= document.getElementById('departmentInput');

var departments = [];
departments["文學院"] = ["中國文學系", "外國語文學系", "歷史學系", "哲學系", "人類學系", "圖資學系", "日本語文學系", "戲劇學系", "藝術史研究所", "語言學研究所", "音樂學研究所", "臺灣文學研究所"];
departments["理學院"] = ["數學系", "物理學系", "化學系", "地質學系", "心理學系", "地理環境資源學系", "大氣科學系", "海洋研究所", "天文物理研究所", "應用物理研究所", "應用數學科學研究所"];
departments["工學院"] = ["土木工程學系", "機械工程學系", "化學工程學系", "工程科學及海洋工程學系", "材料科學與工程學系", "環境工程學研究所", "應用力學研究所", "建築與城鄉研究所", "工業工程學研究所", "醫學工程學研究所", "高分子科學與工程學研究所"];
departments["電機資訊學院"] = ["電機工程學系", "資訊工程學系", "光電工程學研究所", "電信工程學研究所", "電子工程學研究所", "資訊網路與多媒體研究所", "生醫電子與資訊學研究所"];
departments["生命科學院"] = ["生命科學系", "生化科技學系", "植物科學研究所", "分子與細胞生物學研究所", "生態學與演化生物學研究所", "漁業科學研究所", "生化科學研究所"];
departments["管理學院"] = ["工商管理學系", "會計學系", "財務金融學系", "國際企業學系", "資訊管理學系", "商學研究所", "管理學院企業管理專班", "管理學院碩士在職專班"];
departments["生物資源暨農學院"] = ["農藝學系", "生物環境系統工程學系", "農業化學系", "森林環境暨資源學系", "動物科學技術學系", "農業經濟學系", "園藝暨景觀學系", "生物產業傳播暨發展學系", "生物產業機電工程學系", "昆蟲學系", "植物病理與微生物學系", "食品科技研究所", "生物科技研究所"];
departments["社會科學與法律學院"] = ["政治學系", "經濟學系", "社會學系", "社會工作學系", "法律學系", "國家發展研究所", "新聞研究所", "科際整合法律學研究所"];
departments["公衛學院與醫學院"] = ["公共衛生學系", "獸醫學系", "牙醫學系", "藥學系", "醫學系", "護理學系", "醫學檢驗暨生物技術學系", "物理治療學系", "職能治療學系", "職業醫學與工業衛生研究所", "環境衛生研究所", "公共衛生碩士學位學程", "流行病學與預防醫學研究所", "健康政策與管理研究所", "臨床動物醫學研究所", "分子暨比較病理生物學研究所", "臨床牙醫學研究所", "口腔生物科學研究所", "臨床藥學研究所", "臨床醫學研究所", "生理學研究所", "生物化學暨分子生物學研究所", "藥理學研究所", "病理學研究所", "微生物學研究所", "解剖學暨細胞生物學研究所", "毒理學研究所", "分子醫學研究所", "免疫學研究所", "法醫學研究所", "醫學工程研究所", "腫瘤醫學研究所", "基因體暨蛋白體醫學研究所", "腦與心智科學研究所"];


function ChangeDpartmentList()
{
var selCollege=collegeSelect.options[collegeSelect.selectedIndex].value;
console.log(collegeSelect.options[collegeSelect.selectedIndex].value);
while (departmentSelect.options.length)
  {
  departmentSelect.remove(0);
  }
var colleges=departments[selCollege];
if (colleges)
  {
  for (var i=0;i<colleges.length;i++)
    {
    var college=new Option(colleges[i],colleges[i]);
    departmentSelect.options.add(college);
    }
  }
} 