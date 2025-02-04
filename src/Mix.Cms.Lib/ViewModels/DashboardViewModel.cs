﻿using Mix.Cms.Lib.Models.Cms;
using Newtonsoft.Json;
using System.Linq;

namespace Mix.Cms.Lib.ViewModels
{
    public class DashboardViewModel
    {
        [JsonProperty("totalPage")]
        public int TotalPage { get; set; }

        [JsonProperty("totalPost")]
        public int TotalPost { get; set; }

        [JsonProperty("totalProduct")]
        public int TotalProduct { get; set; }

        [JsonProperty("totalModule")]
        public int TotalModule { get; set; }

        [JsonProperty("totalUser")]
        public int TotalUser { get; set; }

        public DashboardViewModel()
        {
            using (MixCmsContext context = new MixCmsContext())
            {
                TotalPage = context.MixPage.Count();
                TotalPost = context.MixPost.Count();
            }
        }
    }
}
