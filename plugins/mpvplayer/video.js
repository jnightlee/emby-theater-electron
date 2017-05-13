﻿define(['loading', 'pluginManager', 'scrollHelper', 'appSettings', 'emby-select', 'emby-checkbox'], function (loading, pluginManager, scrollHelper, appSettings) {

    return function (view, params) {

        view.addEventListener('viewbeforeshow', function (e) {

            var isRestored = e.detail.isRestored;

            Emby.Page.setTitle('Video Settings');

            loading.hide();

            if (!isRestored) {
                scrollHelper.centerFocus.on(view.querySelector('.smoothScrollY'), false);

                renderSettings();
            }
        });

        view.addEventListener('viewbeforehide', saveSettings);

        function saveSettings() {

            appSettings.set('mpv-hwdec', view.querySelector('.selectHwaMode').value);
            appSettings.set('mpv-outputlevels', view.querySelector('.selectNominalRange').value);
            appSettings.set('mpv-displaysync', view.querySelector('.selectRefreshRateMode').value);
            appSettings.set('mpv-deinterlace', view.querySelector('.selectDeinterlace').value);
            appSettings.set('mpv-scale', view.querySelector('.selectScale').value);
            appSettings.set('mpv-cscale', view.querySelector('.selectCScale').value);
            appSettings.set('mpv-dscale', view.querySelector('.selectDScale').value);
            appSettings.set('mpv-tscale', view.querySelector('.selectTScale').value);
            appSettings.set('mpv-ditherdepth', view.querySelector('.selectDitherDepth').value);

            appSettings.set('mpv-interpolation', view.querySelector('.chkInterpolation').checked);
            appSettings.set('mpv-openglhq', view.querySelector('.chkOpenglhq').checked);
            appSettings.set('mpv-correctdownscaling', view.querySelector('.chkCorrectDownscaling').checked);
            appSettings.set('mpv-sigmoidupscaling', view.querySelector('.chkSigmoid').checked);
        }

        function renderSettings() {

            view.querySelector('.selectHwaMode').value = appSettings.get('mpv-hwdec') || '';
            view.querySelector('.selectNominalRange').value = appSettings.get('mpv-outputlevels') || '';
            view.querySelector('.selectRefreshRateMode').value = appSettings.get('mpv-displaysync') || '';
            view.querySelector('.selectDeinterlace').value = appSettings.get('mpv-deinterlace') || '';
            view.querySelector('.selectScale').value = appSettings.get('mpv-scale') || '';
            view.querySelector('.selectCScale').value = appSettings.get('mpv-cscale') || '';
            view.querySelector('.selectDScale').value = appSettings.get('mpv-dscale') || '';
            view.querySelector('.selectTScale').value = appSettings.get('mpv-tscale') || '';
            view.querySelector('.selectDitherDepth').value = appSettings.get('mpv-ditherdepth') || '';

            view.querySelector('.chkOpenglhq').checked = appSettings.get('mpv-openglhq') === 'true';
            view.querySelector('.chkInterpolation').checked = appSettings.get('mpv-interpolation') === 'true';
            view.querySelector('.chkCorrectDownscaling').checked = appSettings.get('mpv-correctdownscaling') === 'true';
            view.querySelector('.chkSigmoid').checked = appSettings.get('mpv-sigmoidupscaling') === 'true';
        }
    }

});