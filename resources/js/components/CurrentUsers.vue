<template>
    <div>
        <p>Currently Connected:</p>
        <div v-for="userIdentifiers in currentUsers" :key="userIdentifiers.id">
            <ul v-if="userIdentifiers.device != 0">
                <li>A user on {{userIdentifiers.device}} using {{userIdentifiers.browser}} browser has connected</li>
            </ul>
            <ul v-else>
                <li>A user on {{userIdentifiers.os}} using {{userIdentifiers.browser}} browser has connected</li>
            </ul>
        </div> 
    </div>
</template>

<script>

console.log(appName);

export default {

    data() {
        return {
            currentUsers: [],
        }
    },

    created() {

        socket.on(appName + '-' + 'user-entered-chat-channel:App\\Events\\UserEnteredChat', function(data) {
            this.currentUsers.unshift(data.userIdentifiers);
        }.bind(this));
    },
}
</script>
