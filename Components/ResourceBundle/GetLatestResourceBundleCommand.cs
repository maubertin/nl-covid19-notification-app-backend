﻿// Copyright © 2020 De Staat der Nederlanden, Ministerie van Volksgezondheid, Welzijn en Sport.
// Licensed under the EUROPEAN UNION PUBLIC LICENCE v. 1.2
// SPDX-License-Identifier: EUPL-1.2

using System.Linq;
using NL.Rijksoverheid.ExposureNotification.BackEnd.Components.EfDatabase.Contexts;
using NL.Rijksoverheid.ExposureNotification.BackEnd.Components.Services;

namespace NL.Rijksoverheid.ExposureNotification.BackEnd.Components.ResourceBundle
{
    public class GetLatestResourceBundleCommand
    {
        private readonly ExposureContentDbContext _DbConfig;
        private readonly IUtcDateTimeProvider _DateTimeProvider;

        public GetLatestResourceBundleCommand(ExposureContentDbContext dbConfig, IUtcDateTimeProvider dateTimeProvider)
        {
            _DbConfig = dbConfig;
            _DateTimeProvider = dateTimeProvider;
        }

        public string Execute()
        {
            var now = _DateTimeProvider.Now();
            return _DbConfig.Set<ResourceBundleContentEntity>()
                .Where(x => x.Release <= now)
                .OrderByDescending(x => x.Release)
                .Take(1)
                .Select(x => x.PublishingId)
                .SingleOrDefault();
        }
    }
}