'use strict';

angular.module('mailApp').factory('letterService', function(stateService, $stateParams, dataService) {
    var selected = {},
        newLetter = {
            letter: {}
        };

    function moveToDir(dir) {
        dataService.base.letters[dir].push(selected.letter);
    }

    function removeFromDir() {
        var currentDir = stateService.currentState();
        if (currentDir === 'preview') currentDir = $stateParams.directory;
        if (currentDir === 'favorites' || currentDir === 'filtered') currentDir = selected.letter.directory;
        var index = dataService.base.letters[currentDir].indexOf(selected.letter);
        dataService.base.letters[currentDir].splice(index, 1)
    }

    function removeLetter(letter) {
        if (letter) selected.letter = letter;
        var currentDir = stateService.currentState();
        if (currentDir === 'preview') currentDir = $stateParams.directory;
        if (selected.letter.favorite) {
            toggleFavorite(selected.letter);
        }
        removeFromDir();
        stateService.setActiveState(currentDir);
        if(selected.letter.deleted === false && selected.letter.directory !== 'drafts') {
            selected.letter.deleted = true;
            moveToDir('trash')
        }
    }

    function recoverLetter() {
        removeFromDir();
        moveToDir(selected.letter.directory);
        selected.letter.deleted = false;
        stateService.setActiveState(selected.letter.directory)
    }

    function setInfo(dir) {
        var obj = {
            sender: 'I',
            date: new Date().getTime(),
            favorite: false,
            unread: false,
            deleted: false,
            directory: dir
        };

        for (var key in obj) selected.letter[key] = obj[key];
        selected.letter.tittle = selected.letter.tittle || 'Без темы...';
        selected.letter.content = selected.letter.content || '';
    }

    function moveNewLetter(dir) {
        selected.letter = newLetter.letter;
        setInfo(dir);
        if (dir === 'sent' && !selected.letter.to) {
            alert('Нет адреса получателя!!!');
            return;
        }
        moveToDir(dir);
        stateService.setActiveState(dir);
        newLetter.letter = {};
    }

    function editDraft() {
        newLetter.letter = selected.letter;
        selected.letter = {};
        removeFromDir();
        stateService.setActiveState('newLetterForm');
    }

    function toggleFavorite(letter) {
        letter.favorite = !letter.favorite;
    }

    function resetSelected() {
        selected = {}
    }

    return {
        selected: selected,
        newLetter: newLetter,
        removeLetter: removeLetter,
        recoverLetter: recoverLetter,
        moveNewLetter: moveNewLetter,
        editDraft: editDraft,
        toggleFavorite: toggleFavorite,
        resetSelected: resetSelected
    }

});