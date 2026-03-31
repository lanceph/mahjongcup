// src/config/characterAssets.ts

export interface CharacterAsset {
  avatar: string;
  fullImg: string;
}

// 預設圖片（當找不到對應角色時使用）
export const DEFAULT_CHARACTER: CharacterAsset = {
  avatar: "/images/avatars/default.webp",
  fullImg: "/images/full/default.webp",
};

// 💡 角色中文與英文檔名對照表
const FULL_IMAGE_NAME_MAP: Record<string, string> = {
  一姬: "yiji",
  二階堂美樹: "erjietang",
  藤田佳奈: "jianai",
  三上千織: "qianzhi",
  相原舞: "xiangyuanwu",
  撫子: "fuzi",
  八木唯: "bamuwei",
  九條璃雨: "jiutiao",
  澤尼婭: "zeniya",
  卡維: "kawei",
  輕庫娘: "qingku",
  莎拉: "shala",
  二之宮花: "erzhigong",
  白石奈奈: "baishinainai",
  小鳥遊雛田: "xiaoniaoyouchutian",
  五十嵐陽菜: "wushilanyangcai",
  涼宮杏樹: "lianggongxingshu",
  北見紗和子: "beijianshahezi",
  雛桃: "chutao",
  藤本綺羅: "tengbenqiluo",
  輝夜姬: "huiyeji",
  艾麗莎: "ailisha",
  寺崎千穗理: "siqiqiansuili",
  宮永咲: "gongyongxiao",
  原村和: "yuancunhe",
  天江衣: "tianjiangyi",
  宮永照: "gongyongzhao",
  福姬: "fuji",
  蛇喰夢子: "shecan",
  早乙女芽亞里: "zaoyinv",
  生志摩妄: "shengzhimo",
  桃喰綺羅莉: "taocan",
  七海禮奈: "qihailinai",
  姬川響: "jichuanxiang",
  森川綾子: "senchuanlingzi",
  西園寺一羽: "xiyuansiyiyu",
  小野寺七羽: "xiaoyesiqiyu",
  四宮輝夜: "sigonghuiye",
  早坂愛: "zaobanai",
  白銀圭: "baiyingui",
  柚: "you",
  北原莉莉: "beiyuanlili",
  竹井久: "zhujingjiu",
  福路美穗子: "fulumeisuizi",
  新子憧: "xinzichong",
  園城寺怜: "yuanchengsilian",
  四宮冬實: "sigongdongshi",
  青鸞: "qingluan",
  如月彩音: "ruyuecaiyin",
  未來: "weilai",
  "C.C.": "cc",
  紅月卡蓮: "kalian",
  嵐星: "lanxing",
  東城玄音: "dongchengxuanyin",
  漢娜: "hanna",
  伊莉雅: "yiliya",
  美遊: "meiyou",
  小黑: "xiaohei",
  伊芙·克里斯特: "yifu",
  琳琅: "linlang",
  砂狼白子: "shalangbaizi",
  小鳥遊星野: "xiaoniaoyouxingye",
  陸八魔亞瑠: "lubamoailu",
  淺黃無月: "qianhuangmuyue",
  希里: "xili",
  萊婭: "laiya",
  辛西婭: "xinxiya",
  南楓花: "nanfenghua",
  花語青: "huayuqing",
  花語白: "huayubai",
  浅倉透: "qiancangtou",
  樋口圓香: "tongkouyuanxiang",
  福丸小糸: "fuwanxiaosi",
  市川雛菜: "shichuanchucai",
  簡: "jian",
  元宵: "yuanxiao",
  間桐櫻: "jiantongying",
  遠坂凜: "yuanbanlin",
  Saber: "saber",
  金烏: "jinwu",
  筱原米亞: "mia",
  四宮夏生: "sigongxiasheng",
  汪次郎: "wangcilang",
  一之瀨空: "yizhilaikong",
  明智英樹: "mingzhiyingshu",
  約瑟夫: "yuesefu",
  齋藤治: "zhaitengzhi",
  艾因: "aiyin",
  月見山: "yuejianshan",
  如月蓮: "ruyuelian",
  石原碓海: "shiyuanduihai",
  七夕: "qixi",
  "A-37": "a37",
  萊恩: "laien",
  瀧川夏彥: "longchuanxiayan",
  赤木茂: "akagi",
  鷲巢巖: "washizu",
  夏彌爾: "xiamier",
  白銀御行: "baiyinyuxing",
  澤克斯: "zekesi",
  魯路修·蘭佩洛基: "luluxiu",
  樞木朱雀: "zhuque",
  凌: "ling",
  穆薩: "musa",
  吉爾: "jier",
  袁楓: "yuanfeng",
  玖辻: "jiushi",
  局: "ju",
  非名: "feiming",
  薩塔恩: "sataen",
  Archer: "archer",
};

const AVATAR_NAME_MAP: Record<string, string> = {
  海海海洋: "ocean",
  嵐靛: "lan",
  Emily亘亘: "egg",
  利利小珠珠: "lili",
  善逸的胡牌: "sanyi",
  呵呵真是可愛呢: "owen",
  美樂冰: "ice",
  窯烤雞肉君: "chicken",
  Z0neSky: "hong",
};

// 💡 核心功能：根據中文名自動產生資源路徑
export const getCharacterAssets = (
  gameName: string,
  playerName: string
): CharacterAsset => {
  const engGameName = FULL_IMAGE_NAME_MAP[gameName.trim()];

  if (!engGameName) {
    return DEFAULT_CHARACTER;
  }

  var engPlayerName = AVATAR_NAME_MAP[playerName.trim()];

  if (!engPlayerName) {
    engPlayerName = "default";
  }

  return {
    avatar: `/images/avatars/${engPlayerName}.webp`,
    fullImg: `/images/full/${engGameName}.webp`,
  };
};
