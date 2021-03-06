﻿using Ribboned.Models;
using System.Collections.Generic;

namespace Ribboned.Repositories
{
    public interface IRibbonRepository
    {
        void Add(Ribbon ribbon);
        void Delete(int id);
        Ribbon GetById(int id);
        List<Ribbon> GetByUserId(int id);
        void Update(Ribbon ribbon);
        List<Ribbon> Search(string q, int userId);
        List<Ribbon> GetByMostRecentRibbons(int id);
        List<Ribbon> GetRecommendedRibbons(int id);
        List<Ribbon> GetUserTrash(int id);
        List<Ribbon> GetByCategory(int id);
    }
}