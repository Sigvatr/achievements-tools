import csv
from html.parser import HTMLParser

class NoneRecorder():

    def __init__(self) -> None:
        self.result = ''
        self.type = ''

    def handle_starttag(self, tag, attrs):
        return self

    def handle_endtag(self, tag):
        return self

    def handle_data(self, data):
        return self


class AchievementNameRecorder():

    def __init__(self) -> None:
        self.result = ''
        self.type = 'achievement_name'

    def handle_starttag(self, tag, attrs):
        return self

    def handle_endtag(self, tag):
        if tag == 'b':
            return self

        if tag == 'u':
            return NoneRecorder()

        raise Exception('Error state')

    def handle_data(self, data):
        self.result += data.strip()
        return self


class Header():

    def __init__(self) -> None:
        self.result = ''
        self.type = 'header'

    def handle_starttag(self, tag, attrs):
        return self

    def handle_endtag(self, tag):
        return NoneRecorder()

    def handle_data(self, data):
        self.result += data.strip()
        return self


class MyHTMLParser(HTMLParser):
    def __init__(self, *, convert_charrefs: bool = ...) -> None:
        super().__init__(convert_charrefs=convert_charrefs)
        self.recording = False
        self.recorder = NoneRecorder()
        self.result = []

    def add_to_result(self, data, type):
        self.result.append((type, data))

    def handle_starttag(self, tag, attrs):
        attributes = {a[0]:a[1] for a in attrs}

        if tag == 'div':
            if 'class' in attributes and attributes['class'] == 'subSectionTitle':
                self.recorder = Header()
        elif tag == 'img':
            self.add_to_result(attributes['src'], 'img')
        elif tag == 'u':
            self.recorder = AchievementNameRecorder()
        elif tag == 'br':
            pass

    def handle_endtag(self, tag):
        new_recorder = self.recorder.handle_endtag(tag)
        if new_recorder != self.recorder:
            self.add_to_result(self.recorder.result, self.recorder.type)
            pass

        self.recorder = new_recorder

    def handle_data(self, data):
        new_recorder = self.recorder.handle_data(data)
        if new_recorder != self.recorder:
            self.add_to_result(self.recorder.result, self.recorder.type)

        self.recorder = new_recorder


def read_parser(parser: MyHTMLParser):
    subsection_name = None
    image = None

    for type, datum in parser.result:
        match type:
            case 'achievement_name':
                yield datum, image, subsection_name
            case 'header':
                subsection_name = datum
            case 'img':
                image = datum.split('/')[-1]


parser = MyHTMLParser()

with open("Steam Community Guide 100_ achievements guide + tips & tricks (base game + all DLC's, include Gathering Storm).htm", 'r') as file:
    parser.feed(file.read())
    parser.close()

with open('achievement.csv', 'w') as f:
    for data in read_parser(parser):
        write = csv.writer(f)
        write.writerow(data)
