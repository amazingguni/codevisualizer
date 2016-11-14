class PdbOutput:
    RESULT_RECORD, \
    OBJECT_ATTRIBUTES, \
    EXEC_ASYN, \
    STATUS_ASYN, \
    NOTIFY_ASYN, \
    CONSOLE_STREAM, \
    TARGET_STREAM, \
    LOG_STREAM, \
    DONE, \
    RUNNING, \
    STOPPED, \
    THREAD_CREATED, \
    THREAD_GROUP_CREATED, \
    THREAD_GROUP_ADDED, \
    THREAD_GROUP_STARTED, \
    THREAD_EXITED, \
    THREAD_GROUP_EXITED, \
    THREAD_SELECTED, \
    LIBRARY_LOADED, \
    LIBRARY_UNLOADED, \
    BREAKPOINT_MODIFIED, \
    EXIT, \
    CONNECTED, \
    ERROR \
    = range(24)

    def __init__(self):
        self.class_ = None     # done, running,...
        self.string = None     # the string of a stream output
        self.type_ = None     # the type of a async response