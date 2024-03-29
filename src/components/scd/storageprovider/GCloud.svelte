<!--
  (c) 2020 Open AR Cloud, This code is licensed under MIT license (see LICENSE.md for details)
  (c) 2024 Nokia, Licensed under the MIT License, SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    // eslint-disable-next-line no-undef
    const projectId = import.meta.env['VITE_GOOGLE_PROJECT_ID'];
    // eslint-disable-next-line no-undef
    const pickerKey = import.meta.env['VITE_GOOGLE_PICKER_KEY'];

    const dispatch = createEventDispatcher();

    let pickerLoaded = false;
    let oauthToken: string;

    function handleClientLoad() {
        // eslint-disable-next-line no-undef
        gapi.load('client:auth2', onAuthLoad);
        // eslint-disable-next-line no-undef
        gapi.load('picker', onPickerLoad);
    }

    export function onPickerLoad() {
        pickerLoaded = true;
        createPicker();
    }

    function onAuthLoad() {
        window.gapi.auth.authorize(
            {
                client_id: '1068640082910-v81bvg55ts1dhamr3q272jouhm9qivkp',
                scope: ['https://www.googleapis.com/auth/drive.file'],
                immediate: false,
            },
            handleAuthResult,
        );
    }

    function handleAuthResult(authResult: GoogleApiOAuth2TokenObject) {
        if (authResult && !authResult.error) {
            oauthToken = authResult.access_token;
            createPicker();
        }
    }

    function createPicker() {
        if (pickerLoaded && oauthToken) {
            // eslint-disable-next-line no-undef
            const view = new google.picker.DocsView(google.picker.ViewId.DOCS);
            // eslint-disable-next-line no-undef
            const upload = new google.picker.DocsUploadView().setIncludeFolders(true);
            // eslint-disable-next-line no-undef
            let picker = new google.picker.PickerBuilder()
                .addView(view)
                .addView(upload)
                // eslint-disable-next-line no-undef
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setAppId(projectId)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(pickerKey)
                .setCallback(pickerCallback)
                .build();

            picker.setVisible(true);
        }
    }

    function pickerCallback(data: any) {
        // eslint-disable-next-line no-undef
        if (data.action === google.picker.Action.PICKED) {
            const first = data.docs[0];
            let file = {
                content: {
                    id: first.id,
                    type: '3D', // TODO: Set based on mime type
                    title: first.name,
                    description: first.description,
                    refs: [] as { contentType: any; url: any }[],
                },
            };

            data.docs.forEach((selection: any) => {
                file.content.refs.push({
                    contentType: selection.mimeType,
                    url: selection.url,
                });
            });

            dispatch('selected', { selection: file });
            // eslint-disable-next-line no-undef
        } else if (data.action === google.picker.Action.CANCEL) {
            dispatch('canceled');
        } else {
            console.log(data.action);
        }
    }
</script>

<svelte:head>
    <script async defer src="https://apis.google.com/js/api.js" on:load={handleClientLoad}></script>
</svelte:head>
