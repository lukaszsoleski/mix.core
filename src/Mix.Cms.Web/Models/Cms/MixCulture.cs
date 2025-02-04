﻿using System;
using System.Collections.Generic;

namespace Mix.Cms.Web.Models.Cms
{
    public partial class MixCulture
    {
        public MixCulture()
        {
            MixConfiguration = new HashSet<MixConfiguration>();
            MixLanguage = new HashSet<MixLanguage>();
            MixModule = new HashSet<MixModule>();
            MixPage = new HashSet<MixPage>();
            MixPost = new HashSet<MixPost>();
            MixUrlAlias = new HashSet<MixUrlAlias>();
        }

        public int Id { get; set; }
        public string Alias { get; set; }
        public string Description { get; set; }
        public string FullName { get; set; }
        public string Icon { get; set; }
        public string Lcid { get; set; }
        public int Priority { get; set; }
        public string Specificulture { get; set; }
        public int Status { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedBy { get; set; }

        public virtual ICollection<MixConfiguration> MixConfiguration { get; set; }
        public virtual ICollection<MixLanguage> MixLanguage { get; set; }
        public virtual ICollection<MixModule> MixModule { get; set; }
        public virtual ICollection<MixPage> MixPage { get; set; }
        public virtual ICollection<MixPost> MixPost { get; set; }
        public virtual ICollection<MixUrlAlias> MixUrlAlias { get; set; }
    }
}
